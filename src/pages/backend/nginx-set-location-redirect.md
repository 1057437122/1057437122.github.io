---
layout: "@/templates/BasePost.astro"
title: How to set nginx with websocket
description: A configure for nginx to handle websocket services.
keywords: nginx, location , redirect
pubDate: 2021-02-07T00:00:00Z
imgSrc: "https://images.unsplash.com/photo-1707343846292-56e4c6abf291?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
imgAlt: "nginx websocket"
---

### configure like this:

```
location / {
  return 301 https://dest-url;
}

```
