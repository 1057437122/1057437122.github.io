---
layout: '@/templates/BasePost.astro'
title: Flutter - how to set localization in sub packages 
description: use localization in flutter sub packages
keywords: flutter, packages, submodules, submodule-localization, flutter localization, flutter i18n, flutter l10n, flutter packages localization, flutter packages assets,flutter international
pubDate: 2024-03-23T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1513054222571-9bcc38c2d6ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1YiUyMHBhY2thZ2V8ZW58MHx8MHx8fDA%3D'
imgAlt: 'flutter packages'
---


### Summary


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





