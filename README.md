
# tokio

[![NPM version](https://img.shields.io/npm/v/tokio.svg?style=flat)](https://npmjs.com/package/tokio) [![NPM downloads](https://img.shields.io/npm/dm/tokio.svg?style=flat)](https://npmjs.com/package/tokio) [![CircleCI](https://circleci.com/gh/egoist/tokio/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/tokio/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

> Web scraping made simple.

## Install

```bash
yarn add tokio
```

## Usage

```js
const Tokio = require('tokio')

const tokio = new Tokio({
  url: 'https://some-website.com'
})

tokio.fetch().then(html => {
  console.log(html) //=> string

  // Query HTML with cheerio (server-side jQuery)
  // https://github.com/cheeriojs/cheerio
  const $ = tokio.query(html)
})
```

## API

### new Tokio(options)

#### options

##### options.url

- __Type__: `string`
- __Required__: `required`

The URL to fetch.

##### options.wait

- __Type__: `number` `string`
- __Default__: `50`

Wait for certain time (in milliseconds) or dom element to show up.

##### options.manually

- __Type__: `boolean`

Instead of using [options.wait](#options-wait), you can manually call `window.__tokio_ready__()` in your website to tell us that it's ready to be captured.

##### options.resourceFilter

- __Type__: `resource => boolean`

Whether to load certain resource. Check out the [resource](https://github.com/jsdom/jsdom/blob/master/lib/old-api.md#custom-external-resource-loader) type.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**tokio** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/tokio/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
