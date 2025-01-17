---
title: Automatic (recommended)
keyword: InstallationAutomaticPage
---

To install the NgDoc, you can use the command below.
This command will automatically install and add the library to your project,
and configure it.

{% include "../../shared/generated-folder.md" %}

```bash group="install" name="Angular" icon="angular"
ng add @sijil/add
```

```bash group="install" name="Nx" icon="nx"
npm install @sijil/add && npx nx g @sijil/add:ng-add
```

By default, NgDoc uses your project's `sourceRoot` as the directory where you should create
documentation, you can always change this, see the `*GettingStartedConfiguration` article for more
details
