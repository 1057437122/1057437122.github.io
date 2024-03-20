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

Flutter support localization in several easy steps, see here <a taget="_blank" href="https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization">Internationalizing Flutter apps</a>.

But if we have several packages in a project, we need to do the steps below:

#### 1. change l10n.yaml config

we need a config like this(for example if you package is named `yes_or_no`):

```
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-class: YesOrNoLocalizations # name of your class, must be camel style
output-localization-file: yes_or_no_localizations.dart # file name to hold the class
synthetic-package: false # important, if you want to import the delegate in another package or app
output-dir: lib/l10n/generated # this is optional, if synthetic-package=false and not stated, defaults to arb-dir location
```

after do `flutter gen-l10n` cmd, you will find the file created to the new folder, which is set above(`lib/l10n/generated`)


#### 2. import file 

then when use it, you need to import like this:

```
import '../../../l10n/generated/yes_or_no_localizations.dart';

```

or 

```
import 'package:yes_or_no/l10n/generated/yes_or_no_localizations.dart';

```

#### 3. call method

and call it like this

```
appBar: AppBar(
  title: Text(YesOrNoLocalizations.of(context)!.helloWorld),
),
```


#### 4. export to main project

of course you need to export the class, to do so, just add a new like in your package library file

```
library yes_or_no;

export 'l10n/generated/yes_or_no_localizations.dart';

```

#### 5. declear in main project

and in your main app, you need to change the material app like this:

```
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:yes_or_no/yes_or_no.dart' as yes_or_no;

return MaterialApp.router(
      localizationsDelegates: const [
        ...AppLocalizations.localizationsDelegates,
        ...yes_or_no.YesOrNoLocalizations.localizationsDelegates,// this is the localizationsDelegates of your submodule
      ],
      supportedLocales: const [
        ...AppLocalizations.supportedLocales,
        ...yes_or_no.YesOrNoLocalizations.supportedLocales,
      ],
      routerConfig: router,
      title: 'Make Easy',
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: ThemeMode.system,
    );
```




