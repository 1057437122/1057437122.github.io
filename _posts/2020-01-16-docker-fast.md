---
title: docker快捷操作
published: true
---

一些在自己工作和公司中用到的一些快捷操作

* 安装PHP的相关库
`docker run --rm --interactive --tty --volume $PWD:/app composer install --ignore-platform-reqs` 

* 导入mysql表数据
``

* 做一个`mysql`
`docker run --name common-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
