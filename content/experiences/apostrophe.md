---
title: 'ApostropheCMS'
description: 'meta description of the page'
date: 2020-11-01
logoImg: '/logo/apostrophe.svg'
logoTitle: 'ApostropheCMS'
period: 'November 2020 - Today'
stack: ['NodeJs', 'Vue', 'MongoDB', 'AWS']
---

Developing / improving ApostropheCMS core and modules.

Setting up and working on ApostropheCMS projects for customers.,

Support to customers and open source community.

Here are some projects I worked on:

### Vue 3 migration

Migration of all the admin UI from Vue 2 to Vue 3.

### Advanced permission

<a class="link" href="https://github.com/apostrophecms/advanced-permission" target="_blank" rel="noopener noreferrer">See Readme</a>

pro module to handle advanced permission system.

Allow the creation of groups with sets of permissions for locales / document types. Users can be part of multiple groups, these groups permissions are merged.

Also developed a dynamic grid to render these permissions:

::img{src="/images/experiences/apostrophe/permission-grid.png" alt="advanced permission module grid"}

### Rework of Palette UI

Palette is a configurable module to allow editors to update the webiste styles.

Rework the Palette UI with a nested system, allow to move the modal on the page, store its position, allow to reset the position.

::img{src="/images/experiences/apostrophe/palette.png" alt="Palette"}

### Rework of multisite

Multisite is a pro module allowing editors to create websites from a dashboard.

::img{src="/images/experiences/apostrophe/multisite.png" alt="Multisite"}

### Setup of a monorepo

Setting up a pnpm monorepo for core and public modules.

### Breakpoint preview

Feature that allows to see the website content in different devices modes.

Uses a `postcss` plugin to transform css, it basically transforms media queries to container queries.

<a class="link" href="https://github.com/apostrophecms/postcss-viewport-to-container-toggle" target="_blank" rel="noopener noreferrer">See postcss plugin</a>

::img{src="/images/experiences/apostrophe/breakpoint-preview.png" alt="Breakpoint Preview"}

### Layout

Core widget that allows editors to create / delete / update columns.

::img{src="/images/experiences/apostrophe/layout.png" alt="Layout Widget"}
