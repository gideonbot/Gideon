## imgur-node
An easy-to-use Node.JS wrapper for version 3 of the imgur API.

#### Installation
```
npm install --save imgur-node
```

#### Example Code
```javascript
// Get album information using a Client.
const Imgur = require('imgur-node');
const client = new Imgur.Client('<CLIENT_ID>');

client.album.get('hlF1z', (err, res) => {
  if (err) console.error(err);
  console.log(res);
});
```

```javascript
// Get album information without using a Client.
const imgur = require('imgur-node');

imgur.album.get('<CLIENT_ID>', 'hlF1z', (err, res) => {
  if (err) console.error(err);
  console.log(res);
});
```

```javascript
// Get album information using request().
const imgur = require('imgur-node');

let options = {
  clientID: '<CLIENT_ID>',
  method: 'GET',
  path: '/album/hlF1z'
};

imgur.request(options, (err, res) => {
  if (err) console.error(err);
  console.log(res);
});
```

#### Links
[Documentation]()

#### License
This project uses GPL-3.0. For more information, click
[here](https://github.com/caedwil/imgur-node/blob/master/LICENSE.md).
