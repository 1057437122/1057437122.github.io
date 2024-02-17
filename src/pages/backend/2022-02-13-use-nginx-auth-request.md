---
layout: '@/templates/BasePost.astro'
title: Use nginx to handle auth request
description: A guide to handle auth requests with nginx
keywords: nginx auth requests
pubDate: 2022-02-13T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1676618539987-12b7c8a8ae61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D'
imgAlt: 'nginx auth requests'
---



Nginx secure linke module is a good idea to make a request security, but sometimes it's not enough, that's why we need to use other modules, such as Njs module.

### step 1: install njs module for nginx

please visit the official website [njs](https://nginx.org/en/docs/njs/)

### step 2: turn on njs module

above `http` config:

```
load_module modules/ngx_http_js_module.so;
```

### step 3: set auth request location

```
location = /authcheck {
        js_content utils.auth;
}
location /tv/ {
    auth_request /validate;# if return 200, request will pass, else will stopped
    alias /img/;
}
location /validate {
    internal;
    set $query '';
    if ($request_uri ~* "([^\?]+)\?(.*)$") {
        # sometimes you also need uri
        set $query "uri=$1&$2";
    }
    proxy_pass http://127.0.0.1/authcheck?$query;
}


```


### step 4: write js scripts

```

function auth(r) {
    // A request maybe like this xxxx.com/tv/a.jpg?security_string_from_frontend=securitystring1234567890
    // You can write any methods you want
    var secret = 'mysecret';
    var security_string_from_frontend = r.args.security_string_from_frontend;
    var etime = security_string_from_frontend.substring(8);
    var uri = r.args.uri;
    var correctUpt = require('crypto').createHash('md5').update(`${secret}${etime}${uri}`).digest("hex").substring(12, 20) + etime;// this is an example, you can have you own security methods
    if (security_string_from_frontend != correctUpt) {
        r.error(JSON.stringify({
            // to make error, remove this in production
            security_string_from_frontend: security_string_from_frontend,
            etime: etime,
            uri: uri,
            correctUpt: correctUpt,
        }));
        r.return(401);
        return;
    } else {
        r.return(200);// passed
    }
}
export default { auth }


```

that's all.