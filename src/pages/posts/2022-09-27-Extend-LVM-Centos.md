---
title: How to resize a logical volume with 5 simple LVM commands
published: true
---

## what commands we will use:
`fdisk`: check avaliable disk to add
`vgs`: show all the volume groups
`pvs`: show all the physic volumes
`lvs`: show all the logic volumes

`pvcreate`: create a physic
`vgextend`: extend a volume group
`lvextend`: extend a logic volume
`xfs_growfs`: resize the XFS filesystem. Or you may use other command for different disk type.

## steps

### 0. check which vg is full

```
# lvs
  LV   VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root centos -wi-ao---- <44.00g
  swap centos -wi-ao----   5.00g
# vgs
  VG     #PV #LV #SN Attr   VSize   VFree
  centos   1   2   0 wz--n- <49.00g    0
```

we can find there're two lvs on one vg, and the vg is totally full => VFree=0


### 1st. you need to insert a new disk or add virtual disk for a virtual server. 

use command below to find which disk to use:


```
#fdisk -l

Disk /dev/sdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0xbbf9b181

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048   209715199   104856576   83  Linux

Disk /dev/sdc: 107.4 GB, 107374182400 bytes, 209715200 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
...
```

we can find `/dev/sdc` is not in use, so let's use it to extends our vg

### 2nd create a new physic volume

```
# pvcreate /dev/sdc
  Physical volume "/dev/sdc" successfully created.
```

### 3rd add pv to vg

```
# vgextend centos /dev/sdc
  Volume group "centos" successfully extended
# vgs
  VG     #PV #LV #SN Attr   VSize   VFree
  centos   2   2   0 wz--n- 148.99g <100.00g
```

now we can see there're about 100G free space on vg centos.

`tips: if you couldnot add pv to vg, maybe your disk is totally full, just delete some files, like nginx logs`

### 4th extend lv

```
# lvextend -l +100%FREE /dev/centos/root
  Size of logical volume centos/root changed from <44.00 GiB (11263 extents) to 143.99 GiB (36862 extents).
  Logical volume centos/root successfully resized.
# lvs
  LV   VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root centos -wi-ao---- 143.99g
  swap centos -wi-ao----   5.00g
```

no need to explain

### 5th make new lv online(resize file system)

we need to check which file system we are using

```
df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
devtmpfs                devtmpfs  3.9G     0  3.9G   0% /dev
tmpfs                   tmpfs     3.9G     0  3.9G   0% /dev/shm
tmpfs                   tmpfs     3.9G  420M  3.5G  11% /run
tmpfs                   tmpfs     3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/mapper/centos-root xfs        44G   44G   47M 100% /
/dev/sda1               xfs      1014M  136M  879M  14% /boot
```

clearly, it's XFS, so we can use `xfs_groupfs` command to resize it

```
#  xfs_growfs /dev/centos/root
meta-data=/dev/mapper/centos-root isize=512    agcount=4, agsize=2883328 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0 spinodes=0
data     =                       bsize=4096   blocks=11533312, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal               bsize=4096   blocks=5631, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 11533312 to 37746688
```


`tips again: different system file type has different command to make new spaces online, check documents`