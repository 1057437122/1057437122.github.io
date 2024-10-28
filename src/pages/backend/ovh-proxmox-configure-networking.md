---
layout: "@/templates/BasePost.astro"
title: Configure OVH proxmox server networking with additional IP
description: how to configure ovh dedicate server networking and vm netwo\
pubDate: 2024-10-28T00:00:00Z
keywords: OVH, dedicate server, proxmox, virtual, vm, networking, ovh networking, ovh vm networking, additional IP, fail-over IP
imgSrc: "https://plus.unsplash.com/premium_photo-1661386253258-64ab9521ce89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNlcnZlcnxlbnwwfHwwfHx8MA%3D%3D"
imgAlt: "dedicate server"
---

/ this post focus on configure the networking settings of ADVANCED GEN-2 dedicate server/

### intro

`OVH` changed `fail-over` IP to `additional IP`, we will talk about how to configure this on `proxmox`.

### Step 1: install `proxmox` on a dedicate server.

I use `OVH` `proxmox` template , you can use an image to do that.

### Step 2: configure master server IP.

We already got an public IP after bought the server, after installation the system, we can login through `ssh` or use `KVM` from `OVH` webpage.

To configure networking we need to use bridge. The configure file is like this:

```
# cat /etc/network/interfaces

auto lo
iface lo inet loopback

auto enp10s0f0np0 # device name, you can use command "ip a " to find out your device
iface enp10s0f0np0 inet static
        address MASTER_PUBLIC_IP/32
        gateway 100.64.0.1  # this information can be found on ovh web panel


auto vmbr0 # this is the default name of proxmox
iface vmbr0 inet static
        address 192.168.0.1/24
        bridge-ports none
        bridge-stp off
        bridge-fd 0
        up ip route add ADDITIONAL_IP/32 dev vmbr0 # you can add more additional IPs
        up ip route add ADDITIONAL_IP2/32 dev vmbr0 # you can add more additional IPs
# route configure
        post-up iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o enp10s0f0np0 -j MASQUERADE
        post-down iptables -t nat -D POSTROUTING -s 192.168.0.0/24 -o enp10s0f0np0 -j MASQUERADE


iface vmbr0 inet6 static
        address IP_V6/56
        gateway fe80::1

```

### Step 3: set network IP forward

Edit the file `/etc/sysctl.conf` and uncomment ` net.ipv4.ip_forward=1` to make it work.

### Step 4: restart networking

You can use `systemctl restart networking` to restart network.

/tips: restart your server may help you a lot when network is unreachable/

### Step 5: install a virtual server.

I love `debian` so I use it as an example.

### Step 6: configure vm networking

After installed the vm server, we can login through the `console` from `proxmox` panel.

The main configure file is also `/etc/network/interfaces`, this is how it looks like.

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback


auto ens18 # once again, you can find your device name with command "ip a"

iface ens18 inet static
        address 192.168.0.2/24 # set an IP in the same net as master server

iface ens18 inet static
        address ADDITIONAL_IP/32 # additional ip
        up ip route replace default via 192.168.0.1 dev $IFACE onlink src ADDITIONAL_IP

```

### Step 7: restart vm network

Command is the same: `systemctl restart networking`

### Step 8: test

Now you can test with ping to check if network is available

`ping 8.8.8.8`

Once again, if anything doesnot work as expected, `RESTART` your dedicate server maybe help.
