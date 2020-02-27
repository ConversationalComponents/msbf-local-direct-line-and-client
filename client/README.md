## Chat Window

This is an implementation of [CoCo Chat Window](https://github.com/ConversationalComponents/chat-window) for use with local direct line for MSBF.

## Customization

The chat window can be customized by changing ./build/config.js
It has the following options:

```js

  headerImage: string, // url for getting the image header. If provided, will be displayed in the header
  headerAlignment: "center"|"left"|"right", // alignment for header contents
  headerText: string, // if provided without headerImage, will be displayed in the header
  headerTextStyle: React.CSSProperties, // react css properties to apply to header text
  userAvatar: "", // url for user avatar
  botAvatar: "" // url for bot avatar

```

Alternatively you can just change the code, `npm install` and `npm run build` :D
