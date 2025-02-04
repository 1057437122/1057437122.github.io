---
layout: "@/templates/BasePost.astro"
title: Create Letsencrypt Wildcard Certificate
description: how to create wildcard certificate with letsencrypt
keywords: letsencrypt, wildcard certification, certbot, renew letsencrypt certification
pubDate: 2023-03-05T00:00:00Z
imgSrc: "https://images.unsplash.com/photo-1603899122361-e99b4f6fecf5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlY3VyZXxlbnwwfHwwfHx8MA%3D%3D"
imgAlt: "security"
---

_this post is base on you have base knowledge about letsencrypt and certbot_

The command to create a wildcard certificate is pretty easy, for example with domain `*.lecy.cc`

```

sudo certbot certonly --manual --preferred-challenges=dns --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d "*.lecy.cc"

```

after run this command on your server, you will got outputs like this:

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Cert is due for renewal, auto-renewing...
Renewing an existing certificate
Performing the following challenges:
dns-01 challenge for lecy.cc

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.lecy.cc with the following value:

n6PilMLOcM2ADfD78HDTuYqzY1ylRZo06ngQPDld-BI

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

```

So, before press `Enter`, we need to go to our `DNS` management, maybe godaddy, to add or edit a txt record, the name should be `_acme-challenge`, and type should be `txt`, value is from the output.

It may take several minutes to refresh the record. So I suggest you to check if the txt record refreshed successfully or not before press `Enter`.

_a easy way to check is to check here:<a href="https://mxtoolbox.com/SuperTool.aspx?action=txt%3a_acme-challenge.lecy.cc&run=toolpage" target="_bland"> THIS PAGE</a>_

Once we found the txt record refreshed, we can press `Enter` and certbot will do the work left.

```

Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/lecy.cc-0001/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/lecy.cc-0001/privkey.pem
   Your cert will expire on 2024-05-26. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

```

After these steps, you can update the configuration of your `nginx` or `apache` to match the new certification files.

That's it!

