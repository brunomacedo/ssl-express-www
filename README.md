# Force HTTPS in Express
It forces HTTPS when HTTP is required, remove www and remove slash-end from url.

## Installation

```prompt
npm i save ssl-express-www
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
If you know about JavaScript / Nodejs / Unit tests. You should probably help me to improve this code, thanks! =D
