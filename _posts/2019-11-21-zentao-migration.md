---
title: 禅道的迁移并升级
published: true
---

公司的项目管理是用禅道免费版做的，之前在一台亚马逊的windows服务器上，现在觉得太贵，想迁移到公司另外在ovh上买的dedicade server上的一个虚拟机里，本来是想让另外一个同事处理，但是时间上他不太充足，于是就由我来处理。

### 备份

我到了windows上去看了一下，是用iis+php+mysql跑的，找到对应的文件路径把zentao的整个目录都拷到了本地，然后通过mysqldump把原来的库导了出来。

### 在目标系统上搭建环境

目标系统是公司一项目的测试环境，是用docker-compose搭建的，所以我就直接想在底下加一个container跑，再配置一下Nginx。

我是直接在[这里](https://www.zentao.net/download/80098.mhtml)这里找到了docker文件，然后放到docker-compose.yml文件中

```
version: '3'
services:
...
...
  zentao:
    build: ./docker_zentao
    container_name: zentao
    volumes:
      - ./zentaodata/zentaopms:/app/zentaopms
      - ./zentaodata/db:/var/lib/mysql
```

上面的volumes中的`./zentaodata/zentaopms`是从原来的windows下导下来的备份文件。

### 开始迁移

* 刷新一下docker`docker-compose up -d`
* 新建一个nginx的配置，把请求转发到此container来，类似于
```
server {
    listen 80;
    server_name zentao.xxxxx.com;
    charset utf-8;
    client_max_body_size 100M;
    location / {
        proxy_pass http://zentao;
    }
}
```

* 进入docker `docker exec -it zentao mysql -uroot -p123456 `，发现没有数据库，先建一个

* `create database zentao`
* 把原来的库导进去
* `docker exec -it zentao mysql -uroot -p123456 zentao<bak.sql`

### 升级禅道 

原来的禅道是11.5版本，这个编译出来的container使用的是11.6版本，在浏览器打开对应的页面，然后按页面提示一步步配置就升级成功了。
