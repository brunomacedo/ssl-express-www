# Force HTTPS in Express
It forces HTTPS when HTTP is required, remove www and remove slash-end from url.

## Installation

```prompt
npm i ssl-express-www
```

## Usage

```javascript
const express = require('express');
const secure = require('ssl-express-www');
const app = express();

// It forces HTTPS when HTTP is required
app.use(secure);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening.'));

```

## Lib
The lib should be auto-generate, but the babel doesn't work very well. It should export the module. I tried this way `package.json`:

```javascript
"scripts": {
  "lib": "./node_modules/.bin/babel --out-dir lib source",
  "build": "rimraf lib && npm run lib -- --watch"
},
```


## Contributing
If you know about JavaScript / Nodejs / Unit tests. You should probably help me to improve this code, thanks! =D
