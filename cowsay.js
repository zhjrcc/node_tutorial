const cowsay = require('cowsay')
const chalk = require('chalk')
console.log(
  chalk.yellow(
    cowsay.say({
      e: '$$',
      T: 'U',
      text: 'I am learning NODE.JS'
    })
  )
);
