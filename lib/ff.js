require('babel-polyfill')
const yargs = require('yargs')

const argv = yargs
  .commandDir('commands')
  .argv
