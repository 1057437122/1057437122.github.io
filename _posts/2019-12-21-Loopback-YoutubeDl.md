---
title: Loopback + youtube dl 写自动下载youtube文件的接口
published: true
---
最近在使用`loopback`这个`nodejs`的框架做一些项目，感觉还挺方便的，现在`nodejs`又是这么火，就把刚开始遇到的一些坑记录下来吧。
也不能算坑，毕竟是自己学艺不精。
用了一下这个框架，感觉这个框架的设计还是很不错的，官方的介绍是这样的
```
LoopBack is a highly extensible, open-source Node.js and TypeScript framework based on Express that enables you to quickly create APIs and microservices composed from backend systems such as databases and SOAP or REST services.
```
大体意思就是很厉害，很好用，很先进，很方便。
不过说起来确实我觉得算是挺方便的，建`restful api`的时候几个命令就可以带库加代码都建出来（虽然现在多数框架都这么支持了）。
好了，我们进入今天的正题。

#### 使用youtubeDl下载youtube视频
在国外的朋友看视频基本上都是youtube，每当碰到有些喜欢的视频想保存下来的时候都需要找软件找插件，有时候有些插件还一会儿工作一会儿不工作，于是我就想自己给网站加个下载youtube视频的功能。
`nodejs`有一个组件就叫`youtube-dl`，可以直接使用。

>添加模型

下载当然需要记录下来，所以需要先建个`model`，直接使用`loopback`的命令就可以添加，`lb4 model`，主要需要记录一个是`url`，一个是用户选择的格式`formatId`，其它的比如说`createTime`等参数都是方便后期使用的。
模型我就不放出来了。

>创建 `repository`

也是直接使用`lb4 repository`选择对应的`model`即可。不需要添加其他功能 。

>写解析方法

这个组件的多数功能都是异步的，比如说获取文件内容，下载文件等，有些可以异步直接用，但是有些（比如说解析文件）就需要改成同步的，所以我自己建了一个工具类，用来把它的异步方法转成同步，以获取文件信息`getInfo`方法为例。
官方的文档是这样的：
```
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err
 
  console.log('id:', info.id)
  console.log('title:', info.title)
  console.log('url:', info.url)
  console.log('thumbnail:', info.thumbnail)
  console.log('description:', info.description)
  console.log('filename:', info._filename)
  console.log('format id:', info.format_id)
})
```
我们用下面的方法将其转成同步的
```
export class MyYoutubeDl {
  static async  getInfo(url: string): Promise<YoutubeFileInt> {
    return new Promise((resolve, reject) => {
      const youtubedl = require('youtube-dl')
      youtubedl.getInfo(url, (err: object, info: YoutubeFileInt) => {
        if (err) {
          reject(err)
        } else {
          console.log(info)
          const formats: YoutubeFormat[] = info.formats.map((item) => {
            return {
              "format": item.format,
              "ext": item.ext,
              "filesize": item.filesize,
              "format_id": item.format_id
            }
          })
          resolve({
            description: info.description,
            formats: formats,
            thumbnail: info.thumbnail,
            title: info.title,
            url: url,
            uploader: info.uploader,
            _filename: info._filename,
            format: info.format,
            ext: info.ext,
            // eslint-disable-next-line @typescript-eslint/camelcase
            format_id: info.format_id,
            filesize: info.filesize
          })
        }
      })
    })
  }
  // static async download
}

```
其中两个`interface`:
```
export interface YoutubeFileInt {
  description: string;
  formats: YoutubeFormat[];// {"format":"249 - audio only (tiny)","ext":"mp3","format_id":"160","filesize":1673048}
  thumbnail: string;
  title: string;
  url: string;
  uploader: string;
  _filename: string;
  format: string;
  ext: string;
  format_id: string;
  filesize: number;
}
export interface YoutubeFormat {
  format: string;
  ext: string;
  format_id: string;
  filesize: number;
}

```

虽然方法比较粗暴，但是可以解决问题哈。

>创建控制器

使用`lb4 controller`创建。
写一个解析功能：
```
@post('/youtube-dls/parse', {
    responses: {
      '200': {
        description: 'parse youtube file ',
        content: { 'application/json': { schema: { 'x-ts-type': YoutubeDl } } },
      },
    },
  })
  async parse(@requestBody() youtubeDl: YoutubeDl): Promise<YoutubeFileInt> {
    return await MyYoutubeDl.getInfo(youtubeDl.url)
  }
```
文章写的比较粗暴，但是主要的使用的内容都在上面了。