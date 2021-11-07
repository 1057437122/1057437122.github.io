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
> db.createUser({user:"myadmin",pwd:"nicetomeetyou",roles:[{role:"readWrite",db:"somedb"}]})
Successfully added user: {
	"user" : "myadmin",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "somedb"
		}
	]
}
```
3. 给这个db授权
```
> db.auth("myadmin","nicetomeetyou")
```


### 管理索引
1. 查看某个collection所有的索引
```
> db.users.getIndexes()
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "yourbiz.users"
	},
	{
		"v" : 2,
		"unique" : true,
		"key" : {
			"phone" : 1
		},
		"name" : "phone_1",
		"ns" : "yourbiz.users",
		"background" : true
	},
	{
		"v" : 2,
		"unique" : true,
		"key" : {
			"outId" : 1
		},
		"name" : "outId_1",
		"ns" : "yourbiz.users",
		"background" : true
	}
]
>
```
2. 删除某个索引
```
> db.users.dropIndex('phone_1')
{ "nIndexesWas" : 4, "ok" : 1 }
```

3. 备份某个库
```
$> mongodump --uri="mongodb://root:example@127.0.0.1:27017/somdb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"
```

4. 恢复某个库
```
$> mongorestore --uri="mongodb://root:example@127.0.0.1:27017/somdb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"
```

5. 设置密码
默认安装了mongodb之后密码为空，直接在本地`mongo --port=21017`即可登录，若想设置密码，则需要先登录上，并使用以下命令设置用户名和密码：
```
> use admin
switched to db admin
> db.createUser({user:"myAdmin",pwd:"passwordYOuWant",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
Successfully added user: {
	"user" : "myAdmin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
>
> db.auth("myAdmin","passwordYOuWant")
1
```
然后在配置文件中打开安全设置 ：
```
security:
  authorization: enabled
```

6. 添加权限到数据库

```
db.grantRolesToUser('myaccount',[{role:'readWrite',db:'somedb'}])
```