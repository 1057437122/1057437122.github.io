---
layout: "@/templates/BasePost.astro"
title: Use Mitmproxy to Monitor Flow
description: how to use mitmproxy to monitor the flow on your iPhone
keywords: mitmproxy, mim, hacker
pubDate: 2025-11-07T00:00:00Z
imgSrc: "https://plus.unsplash.com/premium_photo-1714618835760-5b2175ad3249?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1778"
imgAlt: "mitmproxy"
---

### install mitmproxy on the Mac

`brew install mitmproxy`

### start it

`mitmweb --listen-port  9090`

### connect the iPhone to Mac ( two devices should connect to the same WIFI)

...

### install certification on the iPhone

Open `http://mitm.it` with safari and follow the guide on the images, after download the file, iPhone will tell you to install the certification file manually .

After the installation, you need to enable the certification file in `Settings-> General -> About`, at the bottom of the page, you will find `Certificate Trust Setttings`, enable the `mitm` inside this page.

### Done
