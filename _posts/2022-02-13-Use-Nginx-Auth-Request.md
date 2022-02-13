---
title: Use Nginx+Njs handle auth request
published: true
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