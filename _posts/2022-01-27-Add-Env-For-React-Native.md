---
title: How to add Environment variables in a React Native project with TS
published: true
---

There are a lot of ways in which we can use environment variables in React Native, you can look at many of them listed in this stack-overflow question

The purpose of this blogpost is to point out and explain the simplest and quickest way to make use of environment variables in your RN project with typescript type checking, you can still follow this blog if you are just using javascript.

We will be making use of the handy npm library react-native-dotenv

### STEP 1: Install following packages:

`npm install react-native-dotenv`

or

`yarn add react-native-dotenv`

For typescript install additionally:

`npm install -D @types/react-native-dotenv`

or

`yarn add -D @types/react-native-dotenv`

### STEP 2: update your babel.config.js

This blogpost uses an expo managed project, hence the babel.config.js will look like

```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                },
            ],
        ],
    };
};
```

here, moduleName is the alias we can give to react-native-dotenv library so we can import like:

```
import { ENV_VAR } from "@env" 
```

instead of:

```
import { ENV_VAR } from "react-native-dotenv" 
```

this just makes importing a bit easier :)

###STEP 3: Create a .env file in the root directory and add your environment variable

`ENV_VAR=some-secret-value`

### STEP 4: Use the environment variable by importing it

```
import { ENV_VAR } from "@env" 
```

### STEP 5: Add typescript support

If you are using Typescript in your project, so you must have observed that typescript is yelling at you in STEP 4.

To fix this, we will create an env.d.ts file in the root directory with the following content:

```
declare module '@env' {
    export const ENV_VAR: string;
}
```

Wait a second! we are almost done, phew 😅

After this, you also need to update your tsconfig.json file with:

```
{
    "extends": "expo/tsconfig.base",
    "compilerOptions": {
        "strict": true
    },
    "typeRoots": ["./types"] // <------ you need to add this
}
```

And now we are done!