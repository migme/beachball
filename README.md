# Migme JS SDK

Migme JavaScript SDK. Throws data to the [Migme API](http://docs.migme.apiary.io/).

[![Gitter](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/migme/beachball)
[![Codeship](https://img.shields.io/codeship/5e7f47c0-bfe9-0132-39f9-7eb09717a41c.svg)](https://codeship.com/projects/73070)
[![Travis CI](https://img.shields.io/travis/migme/beachball.svg)](https://travis-ci.org/migme/beachball)
[![Codecov](https://img.shields.io/codecov/c/github/migme/beachball.svg)](https://codecov.io/github/migme/beachball)
[![Dependency Status](https://gemnasium.com/migme/beachball.svg)](https://gemnasium.com/migme/beachball)
[![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm](https://img.shields.io/npm/v/migme-beachball.svg)](https://www.npmjs.com/package/migme-beachball)
[![npm](https://img.shields.io/npm/dm/migme-beachball.svg)](https://www.npmjs.com/package/migme-beachball)
[![GitHub Releases](https://img.shields.io/github/downloads/migme/beachball/latest/total.svg)](https://github.com/migme/beachball/releases/latest)

![Beachball Migbot](https://cdn.rawgit.com/mixstix/5eb0fe3bea4e87ea5034/raw/fbf873d7d1b3c845e9e0f9613690489203479fcc/beachball.svg "Beachball Migbot")

## Installation

### NPM
```bash
npm install migme
```

## Usage

### Loading
```js
// ES6
import Migme from 'migme'

// CommonJS
var Migme = require('migme')

// AMD
define(['migme'], function (Migme) {
  // ...
})
```

#### Loading in browser
```html
<script>
  window.migmeAsyncInit = function() {
    MIGME.init({
      client_id: 'your client id',
      redirect_uri: 'URI to redirect to after login'
    });
  };

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://npmcdn.com/migme/lib/sdk.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
```

### Initialization
```js
Migme.init({
  // options
  client_id: 'XXXXXXXXXXXXX',
  access_token: '' // If you already have one
})
```

### Development
```bash
npm install # Install dependencies
npm test    # Test only
npm run build  # Build only
```
