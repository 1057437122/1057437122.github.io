---
title: mongo小知识 
published: true
---

## 一些常会用的到mongo的操作

### 使用docker启动
```
➜ docker run --name mymongo -d  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:3.6.17
```

### 登录
```
➜ mongo --username mongoadmin --password secret
```

### 创建某个库的用户
1. 需要先切换到对应的db
```
> use somedb
```
2. 在这个db下创建一个用户
```
> db.createUser({user:"myadmin”,pwd:"nicetomeetyou”,roles:[{role:"readWrite”,db:"somedb”}]})
Successfully added user: {
	"user” : "myadmin”,
	"roles” : [
		{
			"role” : "readWrite”,
			"db” : "somedb”
		}
	]
}
```
3. 给这个db授权
```
> db.auth("myadmin","nicetomeetyou")
```