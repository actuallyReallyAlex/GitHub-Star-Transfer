# Github-Star-Transfer
> A simple CLI app written with Puppeteer and NodeJS to manually re-star repositories in GitHub from one account to another.

[![NPM Version][npm-image]][npm-url]
<!-- [![Build Status][travis-image]][travis-url] -->
<!-- [![Downloads Stats][npm-downloads]][npm-url] -->

This app was built to help you "transfer" all starred repositories from one GitHub account to another. There are other apps that exist that export a link, but this one will use Puppeteer to star each repo automatically with a headless browser.

![](https://github.com/alexlee-dev/Github-Star-Transfer/raw/master/assets/GitHub%20Star%20Transfer.gif)

## Installation

Install from NPM

```sh
npm install github-star-transfer --save
```

Link to bin

```sh
npm link
```

## Usage example

```sh
star-transfer
```

<!-- _For more examples and usage, please refer to the [Wiki][wiki]._ -->

<!-- ## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
``` -->

## Release History

* 0.0.1
    * Work in progress

## Meta

Alex Lee – [@alexlee_dev](https://twitter.com/alexlee_dev) – alex@alex-lee.site

Distributed under the GPL license. See ``LICENSE`` for more information.

[https://github.com/alexlee-dev/Github-Star-Transfer](https://github.com/alexlee-dev/)

<!-- ## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request -->

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/github-star-transfer.svg
[npm-url]: https://www.npmjs.com/package/github-star-transfer
<!-- [npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square -->
<!-- [travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square -->
<!-- [travis-url]: https://travis-ci.org/dbader/node-datadog-metrics -->
<!-- [wiki]: https://github.com/yourname/yourproject/wiki -->