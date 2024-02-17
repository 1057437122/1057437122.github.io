---
layout: '@/templates/BasePost.astro'
title: Flutter tricks and tips
description: some experience of using flutter to build an app.
pubDate: 2020-02-06T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmx1dHRlcnxlbnwwfHwwfHx8MA%3D%3D'
imgAlt: 'use flutter to build an app'
---

#### use only one bloc in a page

some times when a data changed, the page will refresh, but if there're more than one bloc in one page, the refresh may cause some mistakes like it may cause all page to refresh instead of a widget.