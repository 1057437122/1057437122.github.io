---
title: 给proxmox 6设置自动快照
published: true
---

公司原来的服务器是在aws.amazon上的，但是后来觉得贵，想换到了ovh上，于是买了一台`dedicated server`，然后使用的`proxomox`做的裸机虚拟化。这样一台机器就可以多用了。

但是很快面临一个问题就是备份的问题，以前在amazon可以直接用他们的工具，现在必须得自己想办法了。

查了一下网上找到了使用`cv4pve-autosnap`这个工具可以自动快照，读了一下它的readme之后发现确实很简单，而且不需要使用root用户就可以无疑大大增加了安全性。

#### 创建备份的用户

我是在GUI上直接创建的
* 点击`Datacenter`，选择`Permission` 下的`Users`
* 选择工具栏`Add`
![image](https://user-images.githubusercontent.com/6631168/69745764-276a9980-1143-11ea-83d0-a17058efdc33.png)
* `Realm`我选择的`Proxmox VE authentication server`，输入用户名`pvesnap`，两次设置密码
![image](https://user-images.githubusercontent.com/6631168/69745801-38b3a600-1143-11ea-91e3-b230082d8517.png)

上面就把用户创建好了，还需要给该用户对应的机器的权限
* 选择要使用该用户做快照的`VM`，选择`Permissions`，
* 选择`Add`，选择`UserPermissions`
![image](https://user-images.githubusercontent.com/6631168/69745904-6d276200-1143-11ea-855a-97b20611b4fd.png)

* 在弹出的`dialog`里选择刚才创建的用户
![image](https://user-images.githubusercontent.com/6631168/69745930-7e706e80-1143-11ea-8fb7-c8218bce5720.png)

登录了一下发现是可以的，这样用户就创建好了。


#### 本地安装`cv4pve-autosnap`

到作者的`github release`页面下载对应的文件`https://github.com/Corsinvest/cv4pve-autosnap`
我的是mac，所以我就下载了最新的`cv4pve-autosnap-osx-x64.zip`版本，

本地直接解压出来并给到执行权限：
```
➜  abc ls
cv4pve-autosnap-osx-x64.zip
➜  abc unzip cv4pve-autosnap-osx-x64.zip
Archive:  cv4pve-autosnap-osx-x64.zip
  inflating: cv4pve-autosnap
abc chmod +x cv4pve-autosnap
➜  abc ls
cv4pve-autosnap             cv4pve-autosnap-osx-x64.zip
➜  abc ls -l
total 113400
-rwxr-xr-x@ 1 work  staff  41218313 26 oct 17:02 cv4pve-autosnap
-rw-r--r--@ 1 work  staff  16080608 27 nov 17:08 cv4pve-autosnap-osx-x64.zip
```
查看一下基本的使用方法
```
➜  abc ./cv4pve-autosnap -h

    ______                _                      __
   / ____/___  __________(_)___ _   _____  _____/ /_
  / /   / __ \/ ___/ ___/ / __ \ | / / _ \/ ___/ __/
 / /___/ /_/ / /  (__  ) / / / / |/ /  __(__  ) /_
 \____/\____/_/  /____/_/_/ /_/|___/\___/____/\__/


Automatic snapshot VM/CT with retention        (Made in Italy)

Automatic snapshot VM/CT with retention

Usage: cv4pve-autosnap [options] [command]

Options:
  -?|-h|--help  Show help information
  --host        The host name host[:port]
  --username    User name <username>@<realm>
  --password    The password. Specify 'file:path_file' to store password in
                file.
  --vmid        The id or name VM/CT comma separated (eg.
                100,101,102,TestDebian)
                -vmid or -name exclude (e.g. -200,-TestUbuntu)
                'all-???' for all VM/CT in specific host (e.g. all-pve1,
                all-\$(hostname)),
                'all' for all VM/CT in cluster

Commands:
  clean         Remove auto snapshots
  snap          Will snap one time
  status        Get list of all auto snapshots

Run 'cv4pve-autosnap [command] --help' for more information about a command.

Report bugs to support@corsinvest.it
```
我们是用的snap功能，故查看一下这个如何使用
```

➜  abc ./cv4pve-autosnap snap --help

    ______                _                      __
   / ____/___  __________(_)___ _   _____  _____/ /_
  / /   / __ \/ ___/ ___/ / __ \ | / / _ \/ ___/ __/
 / /___/ /_/ / /  (__  ) / / / / |/ /  __(__  ) /_
 \____/\____/_/  /____/_/_/ /_/|___/\___/____/\__/


Automatic snapshot VM/CT with retention        (Made in Italy)

Will snap one time

Usage: cv4pve-autosnap snap [options]

Options:
  --label       Is usually 'hourly', 'daily', 'weekly', or 'monthly'
  --keep        Specify the number which should will keep
  --state       Save the vmstate
  --script      Use specified hook script
  -?|-h|--help  Show help information

Report bugs to support@corsinvest.it
```
基本看懂了怎么用，测试一下
```
./cv4pve-autosnap --host xxx.xxx.xxx.xxx --username pvesnap--password 123456789 --vmid 103 snap --label 'hourly'  --keep=10
```
等了几秒钟结果提示`Problem connection! authentication failure`，奇怪啊，我这个用户是可以登录页面的啊，再登录页面上去看下，发现有一点不同的就是登录后的页面用户名区域会带着一个`@pve`，突然明白了这就是创建用户的时候选择的`Realm`。
然后加上这个`Realm`试一下，果然成功了。



