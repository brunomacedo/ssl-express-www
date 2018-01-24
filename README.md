# Force SSL in Express

Force SSL when HTTP is required. Remove www and slash-end on domain.

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


## Contributing - [Git](https://github.com/brunomacedo/ssl-express-www)

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
