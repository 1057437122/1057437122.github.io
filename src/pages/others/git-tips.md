---
layout: "@/templates/BasePost.astro"
title: Git - some tips
description: git problems and solutions.
keywords: git problems and solutions
pubDate: 2025-05-22T00:00:00Z
imgSrc: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2l0fGVufDB8fDB8fHww"
imgAlt: "git"
---

### Error

`error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400 send-pack: unexpected disconnect while reading sideband packet`

### Solution

`git config --global http.postBuffer 524288000`
