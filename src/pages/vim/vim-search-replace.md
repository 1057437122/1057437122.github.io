---
layout: "@/templates/BasePost.astro"
title: Vim search and replace
description: search in vim with regexp
keywords: nvim, search, vim replace
pubDate: 2024-10-15T12:00:00Z
imgSrc: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpbmVzZXxlbnwwfHwwfHx8MA%3D%3D"
imgAlt: "nvim encoding"
---

### search and replace `ObjectId` type data, useful when handle mongodb data from code

```
:%s/"\(\w\{24}\)"/ObjectId("\1")/g

```
