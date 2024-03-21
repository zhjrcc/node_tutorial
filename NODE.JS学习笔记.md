# NODE.JS学习笔记

## process.exit(number)和process.exitCode = number
都可以结束当前的node程序，其中number是指定进程退出时的代码，表示程序执行的成功或失败。通常，0表示成功，非0表示错误或者异常。
区别就在于，process.exit会立刻强制结束当前的程序，而process.exitCode会等待所有的待处理的任务完成后才自动退出。

process.exit的应用场景：
1.简单退出，node程序完成了所有的任务，没有更多的工作要做，可以调用process.exit来退出程序
```js
console.log('任务完成，准备退出')
process.exit()
```
2.错误处理，通过退出码标识出错误类型。
```js
try{
  // 尝试某些代码
} catch(err) {
  console.error("发生错误", err)
  //使用退出码1表示有错发生
  process.exit(1)
}
```
3. 脚本编写，根据不同的执行结果返回不同的退出码。父进程或者调用这个脚本的程序可以根据退出码决定下一步怎么做。
```js
const fs = require('fs')
// 检查文件是否存在
fs.access('app.js', fs.constants.F_OK, (err) => {
  if(err) {
    console.error('文件不存在');
    process.exit(1) // 错误码1表示文件不存在
  } else {
    console.log('文件存在')
    process.exit(0) // 0表示文件存在
  }
})
```
process.exitCode应用场景：
process.exit能用的地方，大部分process.exitCode也能用。
CLI工具
```js
const args = process.argv.slice(2)

switch(args[0]) {
  case '--help':
    console.log('输出帮助信息');
    process.exitCode = 0;
    break;
  case '--version':
    console.log('输出版本信息');
    process.exitCode = 0;
    break;
  default:
    console.error('命令不存在');
    process.exitCode = 1;
}
```

## NODE读取环境变量
1.使用命令行传入参数:`A=1 B=2 C=3 node app`
```js
console.log(process.env.A, process.env.B, process.env.C) //1 2 3
```
2.使用`dotenv`包，读取.env文件中的环境变量:
```js
//.env文件
A=1
B=2
C=3

// app.js
require('dotenv').config()
console.log(process.env.A, process.env.B, process.env.C) //1 2 3
```
