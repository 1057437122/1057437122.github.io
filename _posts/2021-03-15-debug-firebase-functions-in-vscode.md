---
title: Debug firebase functions in vscode
published: true
---

### what we already done
* created a firebase project
* created a firebase-function project in our local computer and it worked fun

### how to debug

#### create a service account

* go to `https://console.cloud.google.com/iam-admin` and select your project
* click `+ CREATE SERVICE ACCOUNT` on top
* fill in the information and download the key, I use `json` format, save this json file in your computer.
* DO NOT LET OTHERS KNOW THIS KEY

#### prepare to debug

1. change directory to your firebase function project fold, and run this 
```
cd functions
npm run build:watch
```
of course you can create a script in your `package.json` and run like `yarn/npm build:watch`

the output looks like this:
```
[21:40:46] Starting compilation in watch mode...

[21:40:50] Found 0 errors. Watching for file changes.
```

2. keep the terminal open in process 1 and start a new terminal, set the google service account key location like this:

```
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/google/service/account/key.json
```

go to your firebase function project folder, start the emulator:

```
firebase emulators:start --inspect-functions

```

if you're using typescript, you need to build first, like

```
npm run build && firebase emulators:start --inspect-functions
```

the firebase-function output will appear.

#### start debug

1. create a launch.json file in your function project in vscode, and set the content like below, port `9229` is default firebase emulator port, if you changed it also change here.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug",
      "port": 9229
    }
  ]
}

```

2. click start debug in vscode, now u can do a request and set some break point to check the value