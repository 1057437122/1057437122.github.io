---
layout: '@/templates/BasePost.astro'
title: Flutter tricks and tips 1
description: some experience of using flutter to build an app.
pubDate: 2020-02-06T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmx1dHRlcnxlbnwwfHwwfHx8MA%3D%3D'
imgAlt: 'use flutter to build an app'
---


#### full size container

```
SizedBox.expand(
  child: Container(
    child:Text('full size container')
  )
)
```


#### blur decoration of a container

```
Container(
  decoration: const BoxDecoration(
    image: DecorationImage(
      image: AssetImage(
        "assets/images/start_screen_bk.png",
      ),
      fit: BoxFit.fitHeight,
    ),
  ),
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
    child: Container(
      decoration: BoxDecoration(color: Colors.white.withOpacity(0.0)),
      child: YourChildWidgetHere,
    ),
  ),
)
```