# GitHub-Star-Transfer

> A simple CLI app written with Puppeteer and NodeJS to automatically re-star repositories in GitHub from one account to another.

[![NPM Version][npm-image]][npm-url]
[![NPM Total Downloads][npm-downloads]][npm-url]

This app was built to help you "transfer" all starred repositories from one GitHub account to another. There are other apps that exist that export a link, but this one will use Puppeteer to star each repo automatically with a headless browser.

## Installation

Install from NPM

```sh
npm install -g github-star-transfer
```

Link to bin

```sh
npm link
```

## Usage Examples

### Initial Setup

```sh
star-transfer
```

![First time running the program.](https://rawgit.com/alexlee-dev/GitHub-Star-Transfer/master/gifs/first-time.svg)

### Startup

```sh
star-transfer
```
![Startup of GitHub Star Transfer in terminal.](https://rawgit.com/alexlee-dev/GitHub-Star-Transfer/master/gifs/startup.svg)

### Editing Credentials

```sh
star-transfer
❯ Settings
❯ Edit User Credentials
❯ Account 1 - (Transfer FROM) / ❯ Account 2 - (Transfer TO)
```

Follow the prompts to enter your username and password.

![Editing credentials.](https://rawgit.com/alexlee-dev/GitHub-Star-Transfer/master/gifs/edit-credentials.svg)

### Viewing Credentials

```sh
star-transfer
❯ View User Accounts
```

![Viewing credentials.](https://rawgit.com/alexlee-dev/GitHub-Star-Transfer/master/gifs/view-credentials.svg)

### Exiting Program

```sh
star-transfer
❯ Exit
❯ Yes
```

![Exiting program.](https://rawgit.com/alexlee-dev/GitHub-Star-Transfer/master/gifs/exit.svg)


## Uninstall

```sh
npm unlink
npm uninstall -g github-star-transfer
```


<!-- _For more examples and usage, please refer to the [Wiki][wiki]._ -->

<!-- ## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
``` -->

## Release History

* 0.0.1 - Current
    * Work in progress

## Meta

Alex Lee – [@alexlee_dev](https://twitter.com/alexlee_dev) – alex@alex-lee.site

Distributed under the GPL license. See ``LICENSE`` for more information.

[https://github.com/alexlee-dev/GitHub-Star-Transfer](https://github.com/alexlee-dev/)

## Contributing

1. Fork it (<https://github.com/alexlee-dev/GitHub-Star-Transfer/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Related Projects

You might also be interested in these projects:

* [starred](https://github.com/maguowei/starred): Creating your own Awesome List by GitHub stars! | [homepage](https://github.com/maguowei/starred "Creating your own Awesome List by GitHub stars!")
* [star-history](https://github.com/timqian/star-history): The missing star history graph of github repos. | [homepage](https://github.com/timqian/star-history "The missing star history graph of github repos.")
* [github-stars-tagger](https://github.com/artisologic/github-stars-tagger): A Google Chrome extension that lets you add tags to your starred repositories directly on GitHub. | [homepage](https://chrome.google.com/webstore/detail/github-stars-tagger/aaihhjepepgajmehjdmfkofegfddcabc "A Google Chrome extension that lets you add tags to your starred repositories directly on GitHub.")
* [star-me](https://github.com/fossasia/star-me): Star FOSSASIA Repositories on Github and Support the Community. | [homepage](https://github.com/fossasia/star-me "Star FOSSASIA Repositories on Github and Support the Community.")

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/github-star-transfer.svg
[npm-downloads]: https://img.shields.io/npm/dt/github-star-transfer.svg
[npm-url]: https://www.npmjs.com/package/github-star-transfer