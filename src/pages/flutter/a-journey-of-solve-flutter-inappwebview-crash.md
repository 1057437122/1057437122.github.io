---
layout: '@/templates/BasePost.astro'
title: A Journey of Solve Flutter_inappwebview Crash Bug
description: this is an experience of solving flutter_inappwebview crash bug
keywords: flutter, inappwebview, flutter_inappwebview, flutter crash, flutter bug
pubDate: 2024-02-21T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1664303959273-21d18b87b88a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsdXR0ZXJ8ZW58MHx8MHx8fDA%3D'
imgAlt: 'flutter inappwebview'
draft: true
---

### Summary

The solution is pretty easy, I just wanna record what I thought during find the solution.

The project is a Youtube-like app, most of the pages are written in flutter, but we also want to embed our website inside the app, so we use `flutter_inappwebview` to handle this.

However, in our website, we also want user can play the videos from the app, so we created a `jsBridge`, so when some buttons on the website are pressed, the video player will be called up.

At first everything works fine, until one day, I upgraded the flutter sdk to the latest version, which is about `3.16.X`, the app crashed when go back from a video player which was called up by our embed website.

### Locate the problem

At first I think it maybe the problem of `WillPopScope` widget, cuz after I upgrade the flutter sdk to `3.16.X`, it warned me this widget was deprecated and would be removed in the future, so I tried to change it to `PopScope`. 

But it still crashed.

After some test and search, I found it not crash everytime and not on all phone model, just when the 