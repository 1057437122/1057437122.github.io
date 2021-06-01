---
title: config nginx support websocket upstream
published: true
---
#### set as this
```
upstream socket-end{
    server ${serverIP}:4000;# this is a websocket server create with maybe socket.io
}
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