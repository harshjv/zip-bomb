const fs = require('fs')
const zb = require('../')

const fileName = 'zipbomb.zip'

zb.createBuffer(1024 * 1024 * 10, 10, 10)
  .then((buffer) => {
    fs.writeFile(fileName, buffer, (err) => {
      if (err) throw err

      console.log(`${fileName} is created`)
    })
  })
