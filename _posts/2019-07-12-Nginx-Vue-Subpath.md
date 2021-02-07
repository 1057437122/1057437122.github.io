---
title: config nginx for vue-cli project with sub path
published: true
---
#### what I need：
I have a vue-cli front-end project, I need to deploy it in a nginx served http server.
#### what should I do:
1. config Nginx
```
location /page/ {
        alias   /var/www/html/page/;
        # access_log /var/log/nginx/page.access.log;
        # error_log /var/log/nginx/page.error.log;
    }
```
I use alias cuz it's easy to read, remember `/` is necessary in `alias`
2. config vue.config.js add `publicPath`: `/` in front of `page` is necessary

```
module.exports = {
    publicPath: '/page',
    // other informations
}
```
these two tips may help you
#### conclusion
slash `/` is important