---
layout: "@/templates/BasePost.astro"
title: Block Some Ports In Debian
description: a tips of block some ports in debian
keywords: debian, firewall-cmd, reject ports, block ports
pubDate: 2024-06-03T00:00:00Z
imgSrc:"https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
imgAlt: "linux firewall"
---

### Summary

Sometimes we just want the inner user to access some ports, but our server also serve some services in public zone. To handle this we need to use firewall-cmd.

### Do the configuration

We need to get the active zone which our interface is using. We can do it like this:

```
# firewall-cmd --get-active-zones
public
  interfaces: eth0 eth1 docker0

```

Then, we need to configure the target port, for example '8088', we can configure like this:

- add the port

```
# firewall-cmd --zone=public --add-port=8088/tcp --permanent

```

- add reject rich rules:

```
# firewall-cmd --zone=public --add-rich-rule='rule family="ipv4" port port="8088" protocol="tcp" reject' --permanent

```

Last,we restart the `firewall-cmd`:

```
# firewall-cmd --reload
```

### Some other useful command:

```
# Check if firewall is running
systemctl status firewalld

# start firewall service
systemctl start firewalld

# reload firewall
firewall-cmd --reload

# check rules of some zone
firewall-cmd --zone=public --list-all

# get active zones
firewall-cmd --get-active-zones

# change interface zone
firewall-cmd --zone=public --change-interface=eth0
firewall-cmd --reload

# add port and reload firewall
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload

# list all zones and rules
firewall-cmd --list-all-zones

# use iptables to check rules
iptables -L -n -v

# use iptables to check some ports
iptables -L -n -v | grep 8080

# system logs
journalctl -xe

```
