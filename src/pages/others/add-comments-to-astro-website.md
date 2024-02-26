---
layout: '@/templates/BasePost.astro'
title: Add comments module to astro website
description: a guide of add comments module to astro website
keywords: comments, github pages, astro website, giscus
pubDate: 2024-02-25T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdHxlbnwwfHwwfHx8MA%3D%3D'
imgAlt: 'astro website'
---


### In A Glance

use <a href="https://giscus.app/" target="_blank">giscus</a>

### Summary

Nowadays a lot of programmers and geeks write their blogs in `markdown` and use `github page` as their hosts, today we will talk about how to add comments module to our website build with `astro` and hosted by `github page`.


### Steps

_before every step, you must already have created a website with github page + astro_

1. Make sure your repository is `public`, you can check it in your repository settings, but if you have already made a website (with your github page), this step must have already be done.
2. Turn on `discussion` on you github repository, in the settings of your repository, scroll down and in the `Feature` box, you will find `discussion` checkbox, make sure it's checked. After that you will find the new tag `Discussions` appears in the header of your repository.
3. Create a category in your `discussions` setting. Give it a name, in the next step you will need this.
3. Install `giscus` in your repository, you can follow this <a href="https://github.com/apps/giscus" target="_blank">giscus installation/configuration</a> to do that.
4. Last step is to configure the `giscus` settings, open <a href="https://giscus.app/" target="_blank">giscus</a>, 
  
  * copy and paste your repository url to the repository text-input, for mine, it is `1057437122/1057437122.github.io`
  * choose the second item in `page <==> discussion mapping`, which is `Discussion title contains page URL`
  * select the category you just created in the 3rd step
  * check `Load the comments lazily` in `Feature` part
  * choose a good `theme`

After the steps above, you will get a script like this:

```
<script
      src="https://giscus.app/client.js"
      data-repo="1057437122/1057437122.github.io"
      data-repo-id="MDEwOlJlcG9zaXRvcnkyMTcwMDE5MDA="
      data-category="post comments"
      data-category-id="DIC_kwDODO8vrM4Cdg2m"
      data-mapping="url"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="transparent_dark"
      data-lang="en"
      data-loading="lazy"
      crossOrigin="anonymous"
      async
    ></script>
```

And in your website source code, write a components like this( for example ):

```
const Comments = () => {
  return (
    <script
      src="https://giscus.app/client.js"
      data-repo="1057437122/1057437122.github.io"
      data-repo-id="MDEwOlJlcG9zaXRvcnkyMTcwMDE5MDA="
      data-category="post comments"
      data-category-id="DIC_kwDODO8vrM4Cdg2m"
      data-mapping="url"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="transparent_dark"
      data-lang="en"
      data-loading="lazy"
      crossOrigin="anonymous"
      async
    ></script>
  );
};

export { Comments };

```


Then you can import and use the component everywhere you want, for me I put it in my `BlogPost` component like 

```
<Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />

    <PostContent content={props.frontmatter}>{props.children}</PostContent>
    <Comments />
  </Section>
```


That's It!