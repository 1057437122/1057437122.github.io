---
layout: '@/templates/BasePost.astro'
title: Best Flutter Sqlite Migration Practice
description: how to write do sqlite migration in flutter project.
keywords: flutter, sqlite, migration, db migration, sqlite migration, sqflite
pubDate: 2024-02-22T00:00:00Z
imgSrc: 'https://plus.unsplash.com/premium_photo-1680700148924-4abdd12c89b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YWJhc2V8ZW58MHx8MHx8fDA%3D'
imgAlt: 'flutter sqlite'
---


### Summary

How to store user/project data is very important in every project, for a flutter project as an example, one of the most popular database used in flutter project is `sqlite`. 

As our project move forward, one thing we need to take more care of is to migrate our db, like sometime we need to create a new table, or we need to add some columns to an existed table.

Today we wil talk about a good way to do this, of course, maybe it's not the best.

_Anothin solution is to use no-relation-db like Hive,maybe we will talk about this next time_ 

### Plugin Versions

What we will talk is base on these versions of plugin

futter: 3.13.6
sqflite: 2.2.0+3

### Why We Need Migration

Use an example to explain:

Our app is a video player, we need to record users' watch history, so we create a table like this:

```
CREATE  TABLE WATCHHISTORY (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          thumb TEXT NOT NULL,
          url TEXT NOT NULL,
          playedat INTEGER NOT NULL,
        )
```

Good, now when a user play a video, we will add a new record. But in the next version, we found our user also want to know the `director` of the video, so we need to add a new column.

The Sql is pretty easy:`ALTER TABLE WATCHHISTORY ADD COLUMN director TEXT;`, but how do we run this ?

The good news is `sqflite` plugin give us a parameter `version` to record which version of our db is at. So we will make article on this.

### My Solution

Let's look at our `openDatabase` method first:

```
   var database = await openDatabase(
      $DBPATH,
      version: $VERSION,
      onConfigure() async {
        // [onConfigure] is the first callback invoked when opening the database. It
        // allows you to perform database initialization such as enabling foreign keys
        // or write-ahead logging
      },
      // [onCreate] or [onUpgrade] or [onDowngrade]: only one of the three will run when db opened if version is set.
      onCreate: (db, version) async {
        //[onCreate] is called if the database did not exist prior to calling [openDatabase]
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        // when 
        /// 1. [onCreate] is not specified
        /// 2. The database already exists and [version] is higher than the last
        /// database version
      },
      onDowngrade:(db, oldVersion, newVersion) async {
        // only when version is lower then last database version
      }
      onOpen: (db) async {
        // before open db returns
      },
    );
```

So to make sure we can migrate our db, we need to make sure the `version` parameter is higher than the last one.

The trick is we can create a `migrations` array and use it's lengh as our version like this:

```
const migrations = [
    $CREATE_HISTORY_TABLE_SQL,
]
```

and we will set the `version` as the length of `migrations` plus 1, plus 1 is a trick to make sure we can run our migration code in array ( array index start from 0) :

```
var database = await openDatabase(
      $DBPATH,
      version: migrations.length + 1
)
```

Let's imagine, the first time when we run our app, the `version` is 1. 

After some days we find we need to add director to this table, we will do like this:

```
const migrations = [
    $CREATE_HISTORY_TABLE_SQL,
    $UPDATE_HISTORY_TABLE_ADD_DIRECTOR,//sql we will run to update table
]

```

The length of `migrations` become 2, so our database version will be 2,  that is when our `onUpgrade` method will be called. 

We will imagine more deeper, next time we add a new column called actor, the `migrations` will be like this:

```
const migrations = [
    $CREATE_HISTORY_TABLE_SQL,// run on version 1,
    $UPDATE_HISTORY_TABLE_ADD_DIRECTOR, // run on version 2
    $UPDATE_HISTORY_TABLE_ADD_ACTOR, // run on version 3
]

```

So our version will be 3. Image a user installed the first version, which means the old db version is 1. And now it's 3, so he needs to run the second and the third migrations, that is `${migrations[1]}` and `${migrations[2]}`. 

We can find we need to run our migrations from the index of `oldVersion` to the index of  `migrations' length(which is newVersion)-1`.So our upgrade code maybe like this:

```
for (int i = oldVersion - 1 ; i < newVersion - 1 ; i++) {
  if (i >= 0) {
    await db
        .execute(upgradeMigrations[i]);
  }
}

```

The full code is like this:

```
 var database = await openDatabase(
      dbPath,
      version: upgradeMigrations.length + 1,
      onCreate: (db, version) async {
          for (int i = 0; i < upgradeMigrations.length; i++) {
            await db
                .execute(upgradeMigrations[i]);
            }
        
      },
     
      onUpgrade: (db, oldVersion, newVersion) async {
        for (int i = oldVersion - 1 ; i < newVersion - 1 ; i++) {
            if (i >= 0) {
              await db
                  .execute(upgradeMigrations[i]);
            }
          }
      },
        onOpen: (db) async {
        //
      },
    );

```

That's it, when we need change our database structure, we just need to add code in `migrations` array. 