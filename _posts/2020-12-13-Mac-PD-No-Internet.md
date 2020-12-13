---
title: mac big sur parallels desktop 16不能联网
published: true
---
#### 解决方案：
使用terminal编辑下面命令
```
sudo vim /Library/Preferences/Parallels/network.desktop.xml
```
把`<UseKextless>-1</UseKextless>`改为`<UseKextless>0</UseKextless>`重启即可。