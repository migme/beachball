# Beachball

Migme JavaScript SDK. Throws data to the [Migme API](http://docs.migme.apiary.io/).

[![Gitter](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/migme/beachball)
[![Codeship](https://img.shields.io/codeship/5e7f47c0-bfe9-0132-39f9-7eb09717a41c.svg)](https://codeship.com/projects/73070)
[![Travis CI](https://img.shields.io/travis/migme/beachball.svg)](https://travis-ci.org/migme/beachball)
[![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm](https://img.shields.io/npm/v/migme.svg)](https://www.npmjs.com/package/migme)
[![npm](https://img.shields.io/npm/dm/migme.svg)](https://www.npmjs.com/package/migme)
[![GitHub Releases](https://img.shields.io/github/downloads/migme/beachball/latest/total.svg)](https://github.com/migme/beachball/releases/latest)

![Beachball Migbot](https://cdn.rawgit.com/mixstix/5eb0fe3bea4e87ea5034/raw/fbf873d7d1b3c845e9e0f9613690489203479fcc/beachball.svg "Beachball Migbot")

## Installation
```bash
npm install
npm test    # Test only
grunt build # Build only
grunt       # Test, then build
```

## CDN
Replace `${VERSION}` with a released version number.
```html
<script src="https://cdn.rawgit.com/migme/beachball/releases/download/${VERSION}/migme.min.js"></script>
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

### Initialization
```
const client = new Migme({
  // options
})
```
