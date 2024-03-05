---
layout: '@/templates/BasePost.astro'
title: Google Signin Token Used Too Early
description: handle error of google signin -> token used too early
keywords: token used too early, nodejs, google signin, ntp service
pubDate: 2024-03-05T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8fDA%3D'
imgAlt: 'google signin'
---

### In A Glance

make sure the time is synced with internet with `ntp service`.


_This is to record how I solve the problem `Token used too early` when use google signin with nodejs._



One day when I introduce one of my apps to my friend, he told me signin with google doesn't work, after check the error, I found when my backend verify the token from the client, google sdk throwed an error:

```
Token used too early, 1709564310.405 < 1709564838: {"iss":"https://accounts.google.com","azp":"xxxxxxxxxxx.apps.googleusercontent.com","aud":"xxxxxxxxxx.apps.googleusercontent.com","sub":"xxxxxxxxx","email":"lecy.cc.app@gmail.com","email_verified":true,"at_hash":"xxxxxxxxx","nonce":"xxxxxxxxxx","name":"Bai Lee","picture":"https://xxxxxxxxxx","given_name":"Bai","family_name":"Lee","locale":"zh-CN","iat":xxxxx,"exp":1709568738}
```

### Solution

After a little search, I found we have this topic on <a href="https://stackoverflow.com/questions/71915309/token-used-too-early-error-thrown-by-firebase-admin-auths-verify-id-token-metho" target="_blanc" >stackoverflow</a> . 

The answer told us we could add `clock_skew_in_seconds` to our verify method to tell google the time issue.But I found in `nodejs` library, which is `google-auth-library`, doesn't have this parameter.

Then I checked the time on my server with `date` command. It shows the error time, which is a hour later than the internet time. So I think to sync the time with internet maybe help, and it really helped!

The solution is <a href="/backend/sync-time-on-debian/" target="_blanc">this page</a> .Just install `ntp service` and make sure the time is synced.

That's It!

