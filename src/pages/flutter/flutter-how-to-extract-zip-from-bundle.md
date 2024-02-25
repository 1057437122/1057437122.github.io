---
layout: '@/templates/BasePost.astro'
title: Flutter How To - extract zip file from bundle
description: how to extract zip file from bundle to application document directory.
keywords: flutter, zip, archive, archive_io, extract zip file, extract zip file from bundle
pubDate: 2024-02-25T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJjaGl2ZXxlbnwwfHwwfHx8MA%3D%3D'
imgAlt: 'flutter archive'
---



### Summary

Sometimes we need to add some zip files to our bundle and extract to application document directory when we need these datas of these files. Today we will talk about this.

### Read Images In Assets

Let's talk about what `assets` are for first.

For some images like icons or avatars, we love to put them in the `assets` folder and read it directory in our app just like this:

```
Image.asset('assets/images/loading-animation.gif')
```

And for a `zip`, we could also do the similar, but not very same, cause zip file could not be loaded directly, we need to use some plugins.

_Note: to access files in `assets` folder, we need to give access from `pubspec.yaml` file_

### Unzip Zip From Assets

We need a plugin called <a href="https://pub.dev/packages/archive" target="_blank">archive</a>

the code is pretty easy:

```
import 'package:archive/archive_io.dart';
import 'package:flutter/services.dart';

ByteData value = await rootBundle.load('assets/zip/zipfile.zip');
Uint8List wzzip =
    value.buffer.asUint8List(value.offsetInBytes, value.lengthInBytes);
InputStream ifs = InputStream(wzzip);
final archive = ZipDecoder().decodeBuffer(ifs);

await extractArchiveToDiskAsync(archive, offlineBiblePath);

```


### Tips

* do not add too much zip file to our bundle

* if you check the manual of `archive` plugin, you will find there are different methods for different type of compressed files, like `TarDecoder()` is used to decode `*.tar` file and `ZipDecoder()` is used to decode `*.zip` file , so don't mix them.