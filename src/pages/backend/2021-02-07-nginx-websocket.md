---
layout: '@/templates/BasePost.astro'
title: How to set nginx with websocket
description: A configure for nginx to handle websocket services.
pubDate: 2021-02-07T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1707343846292-56e4c6abf291?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
imgAlt: 'nginx websocket'
---

---

#### to handle a websocket in nginx is very easy, first we create an upstream in `http` scope

```
upstream socket-end{
    server ${serverIP}:4000;# this is a websocket server create with maybe socket.io
}
```

#### next we config in `server` scope like this 
```
server{
    location /socket/ {
        rewrite /socket/(.*) /$1 break;
        access_log /var/log/nginx/socket.access.log;
        error_log /var/log/nginx/socket.error.log;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://socket-end;
    }
}


```

### Perfect!