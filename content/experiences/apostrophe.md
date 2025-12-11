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

### Advanced permission

<a class="link" href="https://apostrophecms.com/extensions/advanced-permission" target="_blank" rel="noopener noreferrer">See Documentation</a>

pro module to handle advanced permission system.

Worked on the backend to allow the creation of groups with sets of permissions for locales / document types. Users can be part of multiple groups, these groups permissions are merged.

Also developed a dynamic grid to render these permissions:

::img{src="/images/experiences/apostrophe/permission-grid.png" alt="advanced permission module grid"}

### Import export

<a class="link" href="https://apostrophecms.com/extensions/import-export" target="_blank" rel="noopener noreferrer">See Documentation</a>

Module allowing users to export bunch of documents with or without relationships and to import them in other sites.

Documents can be imported in other locales too. Can be plugged to our automatic-translation module that will import and translate to the new locale.

::img{src="/images/experiences/apostrophe/import-export-1.png" alt="Export Documents"}

::img{src="/images/experiences/apostrophe/import-export-2.png" alt="Import Documents"}

Managing duplicated documents, allowing users to override or not. 

::img{src="/images/experiences/apostrophe/import-export-3.png" alt="Import Duplicated Documents"}

### Document version

<a class="link" href="https://apostrophecms.com/extensions/document-version" target="_blank" rel="noopener noreferrer">See Documentation</a>

A module to version documents, stores each one in a collection. 
Allow users to navigate through these versions and to restore one if needed.

For the UI, the user can compare fields of each previous document with the current one.

::img{src="/images/experiences/apostrophe/doc-version.png" alt="Document Version"}

### Automatic translation

<a class="link" href="https://apostrophecms.com/extensions/automatic-translation" target="_blank" rel="noopener noreferrer">See Documentation</a>

Plug AI automatic tranlation to our existing localization system, 
while localizing documents, you can ask to translate its content.

::img{src="/images/experiences/apostrophe/automatic-translation.png" alt="Automatic Translation"}

### Scheduled publishing

<a class="link" href="https://github.com/apostrophecms/scheduled-publishing" target="_blank" rel="noopener noreferrer">See Readme</a>

Module allowing editors to schedule the publication of documents for a certain date and time.

### Document template library

<a class="link" href="https://apostrophecms.com/extensions/doc-template-library" target="_blank" rel="noopener noreferrer">See Documentation</a>

Accelerate content creation with reusable templates for pages and pieces.

Perfect for teams managing multiple similar pages, content creators who need consistent layouts, 
and developers building scalable content workflows.

::img{src="/images/experiences/apostrophe/template-library.png" alt="Doc Template Library"}

### Rework of Palette UI

<a class="link" href="https://apostrophecms.com/extensions/palette-extension" target="_blank" rel="noopener noreferrer">See Documentation</a>

Palette is a configurable module allowing editors to update website styles live.

Rework the Palette UI with a nested system, allow to move the modal on the page, 
store its position, potition reset.

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

### Vue 3 migration

Migration of all the admin UI from Vue 2 to Vue 3.

### Layout

Core widget that allows editors to create / delete / update / grow / shrink / swap columns. 

::img{src="/images/experiences/apostrophe/layout.png" alt="Layout Widget"}
