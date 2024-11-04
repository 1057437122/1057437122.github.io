---
layout: "@/templates/BasePost.astro"
title: ffmpeg usage
description: some usages of ffmpeg
keywords: ffmpeg
pubDate: 2024-08-07T00:00:00Z
imgSrc: "https://plus.unsplash.com/premium_photo-1683140707316-42df87760f3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
imgAlt: "ffmpeg usage"
---

### Compress `wav` to `mp3` with low rate:

```
ffmpeg -i ${input_audio} -b:a 96k -map a ${output_audio}

```

### Cut audio

```

ffmpeg -ss ${start_second} -i ${src_audio.mp3} -t 100 -c copy ${output_audio}

```
