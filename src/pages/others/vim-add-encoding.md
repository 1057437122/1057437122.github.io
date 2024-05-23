---
layout: "@/templates/BasePost.astro"
title: Vim set encoding gb18030
description: how to configure vim encoding when open Chinese file
keywords: nvim, encoding, vim encoding, gb18030, file encoding, utf-8
pubDate: 2024-05-23T12:00:00Z
imgSrc: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpbmVzZXxlbnwwfHwwfHx8MA%3D%3D"
imgAlt: "nvim encoding"
---

Sometimes when we open some Chinese text file, vim can not show it properly, most of the problems are the problem of encoding.

To support gb18030, we need to install iconv in our system. If you use `brew`, you can do like this

```

brew install libiconv
```

Then you can open your file, and run command like this:

```
:e ++enc=gb18030
```
