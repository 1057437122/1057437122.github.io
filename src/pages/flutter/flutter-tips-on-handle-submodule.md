---
layout: '@/templates/BasePost.astro'
title: Tips on handling submodules(packages)
description: some tips on handle submodules(packages) in flutter, like localization or assets
keywords: flutter, packages, submodules, submodule-localization, submodule-assets, flutter localization, flutter i18n, flutter l10n, flutter packages localization, flutter packages assets
pubDate: 2024-03-20T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9jYWxpemF0aW9ufGVufDB8fDB8fHww'
imgAlt: 'flutter packages'
---



## Summary

as our flutter packages grow up, we need to split them into different packages, but some thing we need to handle, today we will talk about these things.

### Assets

you can keep your assets in different packages, just notice when to use these assets, you cannot just do like in the main app:

```
image: DecorationImage(
  image:
      AssetImage("assets/background/main.jpg"),// this will be an error(if you dont copy the image to your main assets folder)
  fit: BoxFit.cover,
),
```

you should add the package name to the assets path like this:

```
image: DecorationImage(
  image:
      AssetImage("packages/yes_or_no/assets/background/main.jpg"),
  fit: BoxFit.cover,
),
```

### Localization

To use localization in Flutter sub package is almost the same as use it in main package, just we need to take care of the location of generated class.

The main steps is here <a targe="_blank" href="/flutter/flutter-localization-in-sub-packages/">Flutter - how to set localization in sub packages</a>