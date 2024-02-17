---
layout: '@/templates/BasePost.astro'
title: Flutter Screencast
description: how to write a flutter screen cast app use dlna protocol.
keywords: flutter, screencast, dlna, upnp, android tv
pubDate: 2021-03-06T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHZ8ZW58MHx8MHx8fDA%3D'
imgAlt: 'use flutter to write a screen cast'
---


## Summary

Nowadays castscreen from a phone to a TV is pretty easy, you can use chrome-cast to handle most of android-devices(except these tvs of China). But sometimes you need to use DLNA protocol.

`tips: in China, you can also use lelink sdk(https://cloud.hpplay.cn/)`

so today we will use DLNA protocol to cast videos to an android TV.

## Pros and cons of using DLNA protocol

### Pros

* no cost, except time and brain
* as DLNA is an open-source protocol, it is supported by most of the TVs

### Cons

* different device maybe have different configurations and commands
* write a lot of code( compared to other chrome/lelink sdk)
* maybe hard to debug

## Steps

### 1. search devices

To search a DLNA device, we need to use Simple Service Discovery Protocol(ssdp), which is a UDP protocol.

The code is like this:

```
final socket = await RawDatagramSocket.bind(address, port);
_sockets.add(socket);

socket.listen((event) {
    if (event == RawSocketEvent.read) {
    final packet = socket.receive();

    if (packet == null) return;

    final data = utf8.decode(packet.data);
    final headers = data.split('\r\n');

    if (headers.indexWhere((e) => e.contains('HTTP/1.1 200 OK')) == -1) {
        return;
    }

    _addDevice(headers);
    }
});
```

in the code above, `address` is an InternetAddress type, we use a function to get it:

```
InternetAddress _getBroadcastAddress(InternetAddressType addressType) {
    switch (addressType) {
      case InternetAddressType.IPv4:
        return InternetAddress.anyIPv4;
      case InternetAddressType.IPv6:
        return InternetAddress.anyIPv6;
      default:
        throw ArgumentError("Internet Address Type not valid");
    }
  }

```

this means we will bind to any ipv4 or ipv6 address.

## to be continued...