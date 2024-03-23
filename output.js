// 格式说明符: %s, %d, %o
console.log('今年是%d ，我是 %s', 2024, 'zhjrcc')

// console.count, console.countReset
console.count('zhjrcc')
console.count('zhjrcc')
console.count('NODE')
console.countReset('zhjrcc')
console.count('zhjrcc')

// console.clear()清除控制台
console.clear()

// 输出程序的栈堆跟踪console.trace
const function1 = () => console.trace()
const function2 = () => function1()
function2()

console.clear()
// console.time(label)测试程序的执行时间
const sum = () => console.log(`1+1=${1+1}`)
const multiply = () => console.log(`2*3=${2*3}`)
const measureTime = () => {
  console.time('sum')
  sum()
  console.timeEnd('sum')
  console.time('multipy')
  multiply()
  console.timeEnd('multipy')
}
measureTime()

// Progress进度条
console.clear()
const ProgressBar = require('progress')

const bar = new ProgressBar('Downloading [:bar] :rate/bps :percent :etas',{
  total: 20
})

const timer = setInterval(()=>{
  bar.tick();
  if(bar.complete) {
    clearInterval(timer)
  }
}, 1000)

// chalk颜色
const chalk = require('chalk')
console.log(chalk.red('Hello chalk'))
