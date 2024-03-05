---
layout: '@/templates/BasePost.astro'
title: Use NTP service to sync time on Debian
description: use ntp service to sync time on debian
keywords: linux, sync time, timestamp, ntp service, ntp
pubDate: 2023-03-05T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGltZXxlbnwwfHwwfHx8MA%3D%3D'
imgAlt: 'time'
---


### Summary

`Time` is very is important on `Linux`, especially for the apps use `timestamp` as an important value to do things like signature. So we need to make sure the time is synced with the internet server.

A very easy way to do this is to use `NTP` service.

_tips: you can use `date` command to check if the time is same with the internet_

### Install

On Debian, we use this command to install ntp service:

```
sudo apt update && sudo apt install ntp -y
```

If success, you may got response like this:

```
... a lot of outputs here...
Reading package lists... Done
Building dependency tree
Reading state information... Done
Selecting previously unselected package libevent-pthreads-2.1-6:amd64.
Preparing to unpack .../libevent-pthreads-2.1-6_2.1.8-stable-4_amd64.deb ...
Unpacking libevent-pthreads-2.1-6:amd64 (2.1.8-stable-4) ...
Selecting previously unselected package libopts25:amd64.
Preparing to unpack .../libopts25_1%3a5.18.12-4_amd64.deb ...
Unpacking libopts25:amd64 (1:5.18.12-4) ...
Selecting previously unselected package ntp.
Preparing to unpack .../ntp_1%3a4.2.8p12+dfsg-4_amd64.deb ...
Unpacking ntp (1:4.2.8p12+dfsg-4) ...
Selecting previously unselected package sntp.
Preparing to unpack .../sntp_1%3a4.2.8p12+dfsg-4_amd64.deb ...
Unpacking sntp (1:4.2.8p12+dfsg-4) ...
Setting up libopts25:amd64 (1:5.18.12-4) ...
Setting up ntp (1:4.2.8p12+dfsg-4) ...
Created symlink /etc/systemd/system/multi-user.target.wants/ntp.service → /lib/systemd/system/ntp.service.
Setting up libevent-core-2.1-6:amd64 (2.1.8-stable-4) ...
Setting up libevent-pthreads-2.1-6:amd64 (2.1.8-stable-4) ...
Setting up sntp (1:4.2.8p12+dfsg-4) ...
Processing triggers for systemd (241-7~deb10u10) ...
Processing triggers for man-db (2.8.5-2+deb10u1) ...
Processing triggers for libc-bin (2.28-10+deb10u2) ...

```

After installation, you will find the config file is created automaticly, we can check the file contents with this command: `cat /etc/ntp.conf` and the output is like this:

```

# /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

driftfile /var/lib/ntp/ntp.drift

# Leap seconds definition provided by tzdata
leapfile /usr/share/zoneinfo/leap-seconds.list

# Enable this if you want statistics to be logged.
#statsdir /var/log/ntpstats/

statistics loopstats peerstats clockstats
filegen loopstats file loopstats type day enable
filegen peerstats file peerstats type day enable
filegen clockstats file clockstats type day enable


# You do need to talk to an NTP server or two (or three).
#server ntp.your-provider.example

# pool.ntp.org maps to about 1000 low-stratum NTP servers.  Your server will
# pick a different set every time it starts up.  Please consider joining the
# pool: <http://www.pool.ntp.org/join.html>
pool 0.debian.pool.ntp.org iburst
pool 1.debian.pool.ntp.org iburst
pool 2.debian.pool.ntp.org iburst
pool 3.debian.pool.ntp.org iburst


# Access control configuration; see /usr/share/doc/ntp-doc/html/accopt.html for
# details.  The web page <http://support.ntp.org/bin/view/Support/AccessRestrictions>
# might also be helpful.
#
# Note that "restrict" applies to both servers and clients, so a configuration
# that might be intended to block requests from certain clients could also end
# up blocking replies from your own upstream servers.

# By default, exchange time with everybody, but don't allow configuration.
 18 #server ntp.your-provider.example
restrict -4 default kod notrap nomodify nopeer noquery limited
restrict -6 default kod notrap nomodify nopeer noquery limited

# Local users may interrogate the ntp server more closely.
restrict 127.0.0.1
restrict ::1

# Needed for adding pool entries
restrict source notrap nomodify noquery

# Clients from this (example!) subnet have unlimited access, but only if
# cryptographically authenticated.
#restrict 192.168.123.0 mask 255.255.255.0 notrust


# If you want to provide time to your local subnet, change the next line.
# (Again, the address is an example only.)
#broadcast 192.168.123.255

# If you want to listen to time broadcasts on your local subnet, de-comment the
# next lines.  Please do this only if you trust everybody on the network!
#disable auth
#broadcastclient

```


To make sure the service is run correctly, we can restart it by using this command:

```
sudo systemctl restart ntp
```

and you can check the staus of ntp with `ntpq -p`:

```
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
 0.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 1.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 2.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 3.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 79.133.44.140   .MBGh.           1 u    1   64    1    1.147    2.770   0.189
 time.cloudflare 10.96.8.7        3 u    2   64    1    1.030    1.909   0.000
 ntp.creoline.ne 131.188.3.222    2 u    1   64    1    0.991    2.996   0.000
 saiph.pmsf.net  131.188.3.220    2 u    1   64    1    5.582    3.532   0.000

```

That's It!