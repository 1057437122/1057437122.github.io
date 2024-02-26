---
layout: '@/templates/BasePost.astro'
title: Conceptions of DLNA
description: some conceptions of DLNA protocol and how to cast a video to TV.
keywords: dlna, upnp, screen cast, android tv
pubDate: 2021-03-01T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NyZWVufGVufDB8fDB8fHww'
imgAlt: 'dlna protocol'
---


The purpose of this article is to explain how to push the video content captured through AirPlay to a DLNA/UPnP renderer like XBMC. The technique applies to both mobile and desktop applications. curl is used to perform the task so that the reader can easily test it. It is a short guide and I encourage you to review the UPnP/DLNA specifications to get an exhaustive understanding of this logic.

UPnP (Universal Plug and Play) is a networking standard. One of its core capability is to facilitate the discovery of intelligent devices available on the network through its Simple Service Discovery Protocol (SSDP). In theory, with UPnP, you can play or share media anytime you want and anywhere you are.

DLNA is another standard that derives from UPnP. Basically, once a product is DLNA certified, it implies that the device/software is a UPnP device that meets a minimum of requirements. So DLNA can be losely viewed as a more restrictive “subgroup” of UPnP. The objective of DLNA is to ensure full interoperability between compliant devices.

As mentioned earlier, to replicate what is being done in this article, you just need curl and XBMC.

First, you need to identify potential renderers on your network. In our case, we already know that XBMC should be able to answer our requests but let’s pretend that we did not know and let’s run XBMC. As mentioned earlier, all UPnp/DLNA devices announce their availability thanks to SSDP. All you need to do is “ask” these renderers to let you know that they are available by sending a UDP message to the multicast address 239.255.255.250 on port 1900:

```
M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MX: 5
Man: “ssdp:discover”
ST: urn:schemas-upnp-org:device:MediaRenderer:1
```

You should get back something like:

```
HTTP/1.1 200 OK
Location: http://192.168.1.101:59772/
Cache-Control: max-age=1800
Server: UPnP/1.0 DLNADOC/1.50 Platinum/0.6.9.1
EXT:
USN: uuid:37f3d9871-b0f7-cd72-1741-86a55e55fce0::urn:schemas-upnp-org:device:MediaRenderer:1
ST: urn:schemas-upnp-org:device:MediaRenderer:1
```

Next, if you use the Location to query the renderer, you will get a description of the devices and the services that it supports:

```
<?xml version=”1.0″ encoding=”UTF-8″?>
<root xmlns=”urn:schemas-upnp-org:device-1-0″ xmlns:dlna=”urn:schemas-dlna-org:device-1-0″>
<specVersion>
<major>1</major>
<minor>0</minor>
</specVersion>
<device>
<deviceType>urn:schemas-upnp-org:device:MediaRenderer:1</deviceType>
<friendlyName>XBMC (kmer)</friendlyName>
<manufacturer>Team XBMC</manufacturer>
<manufacturerURL>http://www.xbmc.org/</manufacturerURL>
<modelDescription>XBMC Media Center – Media Renderer</modelDescription>
<modelName>XBMC Media Center</modelName>
<modelURL>http://www.xbmc.org/</modelURL>
<modelNumber>13.0-ALPHA4 Git:20130518-0da9a79</modelNumber>
……………………
……………………
<icon>
<mimetype>image/png</mimetype>
<width>120</width>
<height>120</height>
<depth>24</depth>
<url>/icon-flat-120×120.png</url>
</icon>
</iconList>
<serviceList>
<service>
<serviceType>urn:schemas-upnp-org:service:AVTransport:1</serviceType>
<serviceId>urn:upnp-org:serviceId:AVTransport</serviceId>
……………………
……………………
<service>
<serviceType>urn:schemas-upnp-org:service:ConnectionManager:1</serviceType>
<serviceId>urn:upnp-org:serviceId:ConnectionManager</serviceId>
……………………
……………………

```


What we are interested in is the AVTransport service which enables to send play and stop instructions to the renderer. Retrieve the controlURL. Mine looks like:

```
<service>
<serviceType>urn:schemas-upnp-org:service:AVTransport:1</serviceType>
<serviceId>urn:upnp-org:serviceId:AVTransport</serviceId>
<SCPDURL>/AVTransport/21fc4817-b8f7-ee43-1461-68a55e55fce0/scpd.xml</SCPDURL>
<controlURL>/AVTransport/21fc4817-b8f7-ee43-1461-68a55e55fce0/control.xml</controlURL>

```

It takes two calls to the renderer to play a video content. The first call to “load” the content and the second call to “play” the content.

Assuming that you have a video content with the url http://my.site.com/path/to/my/content.mp4, then you load the content by executing the following command:


```
curl -H ‘Content-Type: text/xml; charset=utf-8’ -H ‘SOAPAction: “urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI”‘ -d ‘<?xml version=”1.0″ encoding=”utf-8″?><s:Envelope s:encodingStyle=”http://schemas.xmlsoap.org/soap/encoding/” xmlns:s=”http://schemas.xmlsoap.org/soap/envelope/”><s:Body><u:SetAVTransportURI xmlns:u=”urn:schemas-upnp-org:service:AVTransport:1″><InstanceID>0</InstanceID><CurrentURI><![CDATA[http://my.site.com/path/to/my/content.mp4]]></CurrentURI><CurrentURIMetaData></CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>’ ‘http://192.168.1.101:59772/AVTransport/21fc4817-b8f7-ee43-1461-68a55e55fce0/control.xml‘
```

Next, we want to play it:

```
curl -H ‘Content-Type: text/xml; charset=utf-8’ -H ‘SOAPAction: “urn:schemas-upnp-org:service:AVTransport:1#Play”‘ -d ‘<?xml version=”1.0″ encoding=”utf-8″?><s:Envelope s:encodingStyle=”http://schemas.xmlsoap.org/soap/encoding/” xmlns:s=”http://schemas.xmlsoap.org/soap/envelope/”><s:Body><u:Play xmlns:u=”urn:schemas-upnp-org:service:AVTransport:1″><InstanceID>0</InstanceID><Speed>1</Speed></u:Play></s:Body></s:Envelope>’ ‘http://192.168.1.101:59772/AVTransport/21fc4817-b8f7-ee43-1461-68a55e55fce0/control.xml‘

```
That’s it!