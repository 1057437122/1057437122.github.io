---
layout: '@/templates/BasePost.astro'
title: Flutter How To - get callback response from alert dialog
description: how to get callback response from alert dialog
keywords: flutter, alert dialog, AlertDialog, AlertDialog callback
pubDate: 2024-04-01T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1531822762069-cd72bb624630?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxlcnQlMjBkaWFsb2d8ZW58MHx8MHx8fDA%3D'
imgAlt: 'flutter alert dialog'
---

### Summary

When we want to warn our users some information in our app, we always needs to show an `AlertDialog` in our screen.

Today we will talk about how to get the callback response from this widget.


### Show an Alertdialog

To show an dialog in Flutter, we just need to call `showDialog` method like this:

```

 showDialog(
  context: context,
  builder: (context) {
    return Container(
      child:Text('dialog'),
    );
  },
);
        

```


this will show a fullscreen container in our app.

To show an `AlertDialog`, we just need to set the builder as an `AlergDialog` widget:

```

showDialog(
  context: context,
  builder: (context) {
    return return AlertDialog(
      title: Text("DELETE"),
      content: Text("Are you sure to delete this data ?"),
      actions: [
        TextButton(
          onPressed: () {
            // action on press cancel
          },
          child: Text(
            "Cancel"
          ),
        ),
        TextButton(
          onPressed: () {
            // action on presss confirm
          },
          child: Text(
            "Confirm"
          ),
        ),
      ],
    );
  },
);

```


Actually, `showDialog` method return a `Future<bool>`, to set the callback value, we need to set in the `onPressed` method, if we want to return a `Future<true>`, we need to set like this:

```
Navigator.of(context).maybePop(true);
```

so the fullcode is like this:

```
let res = await showDialog(
  context: context,
  builder: (context) {
    return return AlertDialog(
      title: Text("DELETE"),
      content: Text("Are you sure to delete this data ?"),
      actions: [
        TextButton(
          onPressed: () {
            // action on press cancel
            Navigator.of(context).maybePop(false);// res == false
          },
          child: Text(
            "Cancel"
          ),
        ),
        TextButton(
          onPressed: () {
            // other action on presss confirm
            Navigator.of(context).maybePop(true);// res == true
          },
          child: Text(
            "Confirm"
          ),
        ),
      ],
    );
  },
);

```

so when user pressed on `Confirm` button, we will get `res==true`, and when user pressed on `Cancel` button, we will get `res == false`.