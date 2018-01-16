# Force HTTPS in Express
It forces HTTPS when HTTP is required, remove www and slash-end from url.

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

## Contributing
Babel@6 doesn't export default `module.exports` any more.

```prompt
npm i -D babel-plugin-add-module-exports
```

Usage in file `.babelrc`

```json
{
  "presets": ["env"],
  "plugins": [
    "add-module-exports"
  ]
}
```

Run command to generate the lib `package.json`.

```json
"scripts": {
  "lib": "./node_modules/.bin/babel source -d lib",
  "build": "rimraf lib && npm run lib"
},
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
