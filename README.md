[![project-version](https://img.shields.io/badge/1.0.15-version-blue.svg?style=flat-square)](https://github.com/brunomacedo/ssl-express-www/blob/master/specs/index.spec.js) [![node](https://img.shields.io/badge/8.9.1-node-green.svg?style=flat-square)](https://nodejs.org/en/) [![npm](https://img.shields.io/badge/5.5.1-npm-red.svg?style=flat-square)](https://www.npmjs.com) [![downloads](https://img.shields.io/npm/dt/express.svg?style=flat-square)](https://www.npmjs.com/package/ssl-express-www) [![mocha](https://img.shields.io/badge/4.1.0-mocha-yellowgreen.svg?style=flat-square)](https://mochajs.org/) [![test](https://img.shields.io/badge/test-passing-brightgreen.svg?style=flat-square)](https://mochajs.org/)

# Force SSL using Express

Force SSL (HTTPS) when HTTP is required using Express (Nodejs). Remove www and slash end on domain.

## Installation

```prompt
npm i ssl-express-www
```

## Usage CommonJS

```javascript
var express = require('express');
var secure = require('ssl-express-www');
var app = express();

app.use(secure);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening.'));

```

## Usage ES6

Transpile it with [Babel](https://babeljs.io/)

```javascript
import express from 'express';
import secure from 'ssl-express-www';

const app = express();

app.use(secure);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening.'));

```


## Contributing - [Github](https://github.com/brunomacedo/ssl-express-www)

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
