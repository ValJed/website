---
title: "Creating a TUI using Rust and Ratatui"
date: 2025-12-07
coverImg: "/images/articles/ratatui/cover.png"
tags: ["Rust", "Ratatui", "TUI"]
---

I love using TUIs (terminal user interface), I always have two terminals open: one for neovim, one for the rest with multiple panes opened.
And most of the time, if I can use a lightweight terminal program (TUI or not) I definitely choose this option instead of an heavy and bloated electron app.
Here is an example of amazing TUIs: <a class="link" href="https://github.com/aristocratos/btop" target="_blank" rel="noopener noreferrer">btop</a>, 
<a class="link" href="https://github.com/jesseduffield/lazygit" target="_blank" rel="noopener noreferrer">lazygit</a>, 
<a class="link" href="https://github.com/jesseduffield/lazydocker" target="_blank" rel="noopener noreferrer">lazydocker</a>, 
<a class="link" href="https://github.com/LucasPickering/slumber" target="_blank" rel="noopener noreferrer">slumber</a>, 
<a class="link" href="https://github.com/achristmascarl/rainfrog" target="_blank" rel="noopener noreferrer">rainfrog</a>...

I wanted a pomodoro tool right in my terminal, where I can see the timer, where I can track my tickets / projects and the time spent on them, and where I'm notified when a session ends.

I won't document the entire process of creating TUIs with Ratatui because the 
<a class="link" href="https://ratatui.rs"  target="_blank" rel="noopener noreferrer">official documentation</a> 
is the right place, but I want to show my experience. 

Let's dive into it.

First, here is my entry point:

```rust
fn main() -> Result<()> {
  errors::install_hooks()?;
  let mut terminal = tui::init()?;
  let user_config: UserConfig =
    confy::load("tomato", "config")
      .expect("Error when loading the config file");
  App::new(&user_config).run(&mut terminal)?;
  tui::restore()?;
  Ok(())
}
```

I won't go over the errors handling but basically it restores initial terminal state before to print the message.
I might improve this later with an internal notification system.

I get the user config that contains default timing values and DB location. 
Generated with default values but is modifiable.

Then we init the terminal TUI system, this module contains two method, `init` and `restore`.
`init` starts the TUI, `restore` gets the original state of your terminal when you close the TUI, 
it uses crossterm under the hood.

The raw mode blocks normal terminal events the time your TUI is opened.

```rust
pub fn init() -> io::Result<Tui> {
  execute!(stdout(), EnterAlternateScreen)?;
  enable_raw_mode()?;
  Terminal::new(CrosstermBackend::new(stdout()))
}

pub fn restore() -> io::Result<()> {
  execute!(stdout(), LeaveAlternateScreen)?;
  disable_raw_mode()?;
  Ok(())
}
```

The application needs a state like a video game would, 
the whole app is rendered on each frame so we need to structure it with data in mind. 

```rust
pub struct App {
  pub state: State,
  pub exit: bool,
  pub current_session: Option<Session>,
  pub input: String,
  pub projects_list: ProjectsList,
  pub repo: ProjectRepository,
  pub default_work_duration: i32,
  pub default_break_duration: i32,
}

pub enum State {
  None,
  WorkSession,
  BreakSession,
  ConfirmBreak,
  ConfirmWork,
  ConfirmDelete,
  ChooseTime,
  WorkInput,
  BreakInput,
  ProjectsList,
  ProjectsInputAdd,
  ProjectsInputUpdate,
}
```

It has a state, some default values, an input to allow users to provide 
informations like work / break time, project names, etc.

Ok, now we need to implement methods on our App struct, the one we use in the entry point, 
there is a `new` method to instantiate the App, it just returns an instance.
And a `run` method that runs the app.

```rust
pub fn run(
  &mut self,
  terminal: &mut tui::Tui,
) -> Result<()> {
  while !self.exit {
    terminal.draw(|frame| {
      self.render_layout(frame);
    })?;

    if event::poll(Duration::from_millis(100))? {
      let event = event::read()?;
      self.handle_events(event);
    }
  }
  Ok(())
}
```

Pretty simple, we draw the UI, then we listen for events.

The `render_layout` method renders the UI based on the current State, here is a short version.

```rust
fn render_layout(&mut self, frame: &mut Frame) {
  frame.render_widget(&mut *self, frame.area());
  match &self.state {
    State::WorkSession => {
      let session = self.current_session.as_ref().unwrap();
      let time =
        utils::render_timer(session.start, session.duration);
      if time.is_none() {
        self.toggle_session();
        return;
      }
      let counter_widget = CounterWidget {
        time: time.unwrap(),
        session_type: session.session_type,
      };
      frame.render_widget(counter_widget, frame.area());
    }
    State::ConfirmWork => frame.render_widget(
      ConfirmWidget {
        question: String::from(" Back to work? "),
      },
      frame.area(),
    ),
  }
}
```

The first line renders the App global widget, which is the global layout of the App, it looks like this.

::img{src="/images/articles/ratatui/layout.png" alt="App Layout"}

Then I render widgets above this global layout based on the current state, 
it can be a work session counter, a projects list, a confirmation modal, etc.

So, I need to implement a `render` method for my entire App that will be the global layout.

```rust
impl Widget for &mut App {
  fn render(self, area: Rect, buf: &mut Buffer) {
    let title = Title::from(" 🍅 Tomato ".bold());
    let toggle_session = if self.current_session.is_none() {
      " Start "
    } else {
      " Stop "
    };

    let main_cmd = match self.state {
      State::WorkInput | State::BreakInput => "<Enter>",
      _ => "<Space>",
    };
    let projects = " Projects ";
    let instructions = Title::from(Line::from(vec![
      toggle_session.into(),
      main_cmd.blue().bold(),
      projects.into(),
      "<P>".blue().bold(),
      " Quit ".into(),
      "<Q> ".blue().bold(),
    ]));
    let selected_project = self.get_selected_project();
    let selected_project_name = match selected_project {
      None => String::from("None"),
      Some(project) => project.name.clone(),
    };
    let project_title = Title::from(format!(
      " 📁 {} ",
      truncate(selected_project_name, 25)
    ))
    .alignment(Alignment::Right)
    .position(Position::Top);
    Block::bordered()
      .title(title.alignment(Alignment::Left))
      .title(project_title)
      .title(
        instructions
          .alignment(Alignment::Center)
          .position(Position::Bottom),
      )
      .border_set(border::THICK)
      .render(area, buf);
  }
}
```

It looks like a lot of code but it's pretty simple and just renders the UI showed above. 
Depending on the state we change the available actions (called instructions), 
if a project is selected we show its name on the top right corner and that's it.

It uses the widget `Block` from Ratatui to do this, this widget support titles, 
you can have multiple with different positions. 
I use them for my TUI title, the selected project and the instructions.

You can also define styles for your titles, paddings, borders, etc. 
See the <a class="link" href="https://docs.rs/ratatui/latest/ratatui/widgets/index.html" target="_blank" rel="noopener noreferrer">list of widgets</a>.

Let's see a more complex widget that uses a list to render projects. 

::img{src="/images/articles/ratatui/projects_list.png" alt="Projects List"}

My App contains `projects_list` that looks like this.

```rust 
pub struct ProjectsList {
    pub projects: Vec<Project>,
    pub selected_id: Option<usize>,
    pub state: ListState,
}
```

The `ListState` struct is provided by Ratatui, it's the internal state of the list widget (highlighted item, overflow etc).
It allows ratatui to scroll automatically to the highlighted items for example when going out of the view.

I render the widget this way.

```rust 
State::ProjectsList => frame.render_widget(
  ProjectsListWidget {
    projects: &self.projects_list.projects,
    selected_id: self.projects_list.selected_id,
    state: &mut self.projects_list.state,
  },
  frame.area(),
),
```

And the render implementation looks like this:

```rust
impl Widget for ProjectsListWidget<'_> {
  fn render(self, area: Rect, buf: &mut Buffer) {
    let session_type = " Projects ";
    let title = Title::from(session_type.bold());
    let instructions = Title::from(Line::from(vec![
      " Add ".into(),
      "<A>".blue().bold(),
      " Delete ".into(),
      "<D>".blue().bold(),
      " Update ".into(),
      "<U> ".blue().bold(),
    ]));
    let block = Block::bordered()
      .title(title.alignment(Alignment::Center))
      .title(
        instructions
          .alignment(Alignment::Center)
          .position(Position::Bottom),
      )
      .padding(Padding::new(1, 1, 1, 1));

    let highlighted_index = match self.state.selected() {
      Some(index) => index,
      None => 0,
    };

    let projects: Vec<ListItem> = self
      .projects
      .iter()
      .enumerate()
      .map(|(i, project)| {
        let is_selected = match self.selected_id {
          None => false,
          Some(id) => id == project.id,
        };

        let is_current = highlighted_index == i;
        let pre_content =
          if is_selected { "> " } else { "" };
        let content =
          pre_content.to_string() + &project.name.clone();
        if is_current {
          return ListItem::from(content)
            .style(SELECTED_STYLE);
        }

        ListItem::from(content)
      })
      .collect();

    let list = List::new(projects).block(block);
    let list_area = center(
      area,
      Constraint::Length(100),
      Constraint::Length(10),
    );
    StatefulWidget::render(
      list, list_area, buf, self.state,
    );
  }
}
```

It creates a block with a title, instructions, and the main part, renders items.  
As you can see, we here use a `StatefulWidget` which is a widget with an internal state, passed as third argument.

this internal state allows Ratatui to render the right view with visible highlighted item. 
It also allows myself to get the highlighted item and to select the previous / next or to perform any operation on it.
This method is implemented on the App struct, and has access to its state.

```rust 
  fn get_highlighted_project(&self) -> Option<&Project> {
    let highlighted_index =
      match self.projects_list.state.selected() {
        Some(index) => index,
        None => 0,
      };
    self.projects_list.projects.get(highlighted_index)
  }
```

Last but not least, event listeners. We saw in the App `run` method that we listen events after rendering the UI.
Here is the method.

```rust 
fn handle_events(&mut self, event: Event) {
  match event {
    Event::Key(key_event)
      if key_event.kind == KeyEventKind::Press =>
    {
      match self.state {
        State::WorkInput | State::BreakInput => {
          self.handle_num_input(key_event)
        }
        State::ProjectsList => {
          self.handle_list_input(key_event)
        }
        State::ProjectsInputAdd
        | State::ProjectsInputUpdate => {
          self.handle_project_input(key_event)
        }
        _ => self.handle_key_event(key_event),
      }
    }
    _ => {}
  }
}
```
As you can see, based on the current state, I have different listeners. 
I have different ones for number inputs, text inputs, list, normal state.

The default one allows to start a timer, access the project list, reply to confirmation modals or exit.

```rust 
fn handle_key_event(&mut self, key_event: KeyEvent) {
  match key_event.code {
    KeyCode::Char('q') => self.exit(),
    KeyCode::Char(' ') => self.toggle_session(),
    KeyCode::Char('y') => match self.state {
      State::ConfirmBreak => self.start_break_input(),
      State::ConfirmWork => self.start_work_input(),
      State::ConfirmDelete => {
        self.delete_project();
        self.state = State::ProjectsList;
      }
      _ => {}
    },
    KeyCode::Char('n') => match self.state {
      State::ConfirmBreak => self.start_work_input(),
      State::ConfirmWork => self.start_break_input(),
      State::ConfirmDelete => {
        self.state = State::ProjectsList
      }
      _ => {}
    },
    KeyCode::Char('p') => match self.state {
      State::BreakSession => {}
      State::WorkSession => {}
      _ => {
        self.list_projects();
      }
    },
    _ => {}
  }
}
```

I have a specific listener for the project list that needs proper events (select, add, update, delete).

Here is, I think, a quite complete overview of what is doable with Ratatui. 
My code contains more logic (sqlite repository, notifications, timer utils) but I wanted to highlight `Ratatui` here.

See the 
<a class="link" href="https://github.com/ValJed/tomato" target="_blank" rel="noopener noreferrer">github repo</a> for more info.
