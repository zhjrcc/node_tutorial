const readline = require('readline')
const prompt = require('prompt-sync')()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// rl.question('What is your name？', name => {
//   console.log(`Hi, ${name}`)
//   rl.close()
// })

// 使用prompt-sync，同步提示而不是异步回调
const age = prompt('How old are you？');
console.log(age, '岁')
