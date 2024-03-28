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
//也可以不使用require函数，在CLI中输入：node -r dotenv/config env
require('dotenv').config()
console.log(process.env.A, process.env.B, process.env.C) //1 2 3

```

## REPL

是NODE自带的一个交互式编程环境，Read, Evaluate, Print, Loop.读取，求值， 输出，循环。在终端中输入node就可以进入。
也可以在js程序文件中开启REPL：
```js
const repl = require('repl')

// 返回一个repl实例
const local = repl.start("#")

local.on('exit', ()=>{
  console.log('Good Bye!')
})
```

## NODE获取从命令行传递的参数

终端中输入`node app.js name=zhjrcc`.
```js
console.log(process.argv)
/**
[
  '/Users/zhjr/.nvm/versions/node/v18.13.0/bin/node',
  '/Users/zhjr/Github/node_tutorial/app',
  'name=zhjrcc'
]
 */
```
使用`minimist`让获取参数变得更简单，需要注意的是，传递参数需要使用两个连字符--.
`node app --name=zhjrcc`
```js
const minimist = require('minimist');
argv = minimist(process.argv)
// zhjrcc
console.log(argv.name)
```

## 在NODE中输出CONSOLE

```js
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
// console.time()测试程序的执行时间
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
```
使用progress在终端中显示进度条

```js
const ProgressBar = require('progess')

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
```

## NODE在命令行中进行输入

```js
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
```

## NPM

### NPM命令：
npm init
npm install
npm install <package_name>[-g --save-dev, --no-save,--save-optional, --no-optional]
npm install <package_name>@version
npm update
npm update <package_name>
npm run <task-name>
npm list
npm view <package_name> version
npm uninstall <package_name>
npm help
npx

### npx
当下载的包中含有可执行文件，它的位置在node_modules/.bin目录下，可以使用npx命令执行它。`npx nodemon app`
`npx cowsay I am learning NODE.JS`

```js
const cowsay = require('cowsay')
const chalk = require('chalk')
console.log(
  chalk.red(
    cowsay.say({
      e: '$$',
      T: 'U',
      text: 'I am learning NODE.JS'
    })
  )
);
```
### package.json和package-lock.json

package.json 和 package-lock.json 都是 Node.js 项目中用来管理依赖关系的文件，它们之间有以下区别：
1. **package.json**:
   - package.json 是用来描述项目的元数据和配置信息的文件，包含了项目的名称、版本、作者、许可证、依赖项等信息。
   - 在 package.json 中，可以手动添加和更新项目所需的各种依赖包，并且可以定义需要的版本范围。
   - 通过运行 `npm install` 命令，npm 会根据 package.json 安装项目所需的依赖包。

2. **package-lock.json**:
   - package-lock.json 是 npm 在安装依赖包时自动生成的文件，用于锁定依赖包的确切版本。
   - package-lock.json 文件会记录每个依赖包的确切版本号，以确保每个构建环境中安装的依赖包版本一致。
   - 这样可以避免由于依赖包的更新而导致的不兼容性或版本冲突问题。

综上所述，package.json 主要用于描述项目信息和依赖包的范围，而 package-lock.json 则是详细记录项目依赖包的确切版本，帮助确保跨不同环境的一致性。在实际项目开发中，两者通常一起使用以确保稳定的依赖管理。

### ^和~
语义化版本控制：主要版本.次要版本.补丁版本
^允许更新到次要版本和补丁版本；
~只允许更新到补丁版本；

### NODE导出和导入
三种导出方式
```js
// const honda = {
//   branch: "本田",
//   model: "雅阁",
// };

// const toyota = {
//   branch: '丰田',
//   module: '凯美瑞'
// }
// 1.使用module.exports= 对象，导出
// module.exports = honda;
// 使用这种方式会覆盖前一个导出对象
// module.exports = toyota;

// 2.使用exports.要导出的对象名 = 对象，导出
// exports.car = honda
//使用这种方式时，可以在导入时使用解构赋值的方式{car} = require('module-car')
// exports.car = {honda, toyota}

//3.使用exports.要导出的对象 = 值，导出
//使用这种方式时，可以在导入时使用解构赋值的方式{honda, toyota} = require('module-car')
exports.honda = {
  branch: "本田",
  model: "雅阁",
};
exports.toyota = {
  branch: "丰田",
  model: "凯美瑞",
};
```

## NODE.JS错误处理
```js
//1.使用Error,throw
// const error = new Error('这是一个标准的错误对象')
// throw error;

//2. 使用自定义错误对象
// const CustomeError = require('./customError');

// const error = new CustomeError('这是一个自定义的错误对象')
// throw error

const doSomething = () => {
  console.log("这是doSomething函数");
  // fetch1未定义
  // fetch1("localhost:300/api");
  let data = "这是doSomething函数";
  return data;
};
// 使用try...catch
// try {
//   doSomething();
// } catch (err) {
//   throw err;
// }
// 4.使用process.on('uncaughtException')监听所有未捕获的错误
// doSomething()
// process.on('uncaughtException',(err) => {
//   throw err;
//   process.exit(1)
// })

// 5.使用promise的catch
// const promise = new Promise((resolve, reject) => {
//   if (false) {
//     resolve(doSomething());
//   } else {
//     reject(doSomething());
//   }
// });

// promise.then((val) => {
//   console.log(val)
// }).catch((err)=>{
//   console.log(err)
// })

// async/await的异常处理，搭配try...catch

const someFunction = async () => {
  try {
    await doSomething();
  } catch(err) {
    console.log(err)
  }
};
someFunction()
```

## async/await和promise

两者都是为了异步编程而设计出来的。
```js
// promise
const shopOpen = true;

const order = (time, work) => {
  return new Promise((resolve, reject) => {
    if (shopOpen) {
      setTimeout(() => {
        resolve(work());
      }, time);
    } else {
      reject(console.log("店铺关门了"));
    }
  });
};
order(2000, () => {
  console.log("客人点了一杯草莓酸奶");
})
  .then(() => {
    return order(1000, () => {
      console.log("店员们开始做草莓酸奶");
    });
  })
  .then(() => {
    return order(2000, () => {
      console.log("草莓已经被捣碎");
    });
  })
  .then(() => {
    return order(2000, () => {
      console.log("草莓酸奶做好了！");
    });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("订单自动取消了");
    }
  })
  .finally(() => {
    console.log("结束营业，店铺到时间关门了");
  });

```
```js
// async/await
const shopOpen = true;

const step = (time, work) => {
  return new Promise((resolve, reject) => {
    if (shopOpen) {
      setTimeout(() => resolve(work), time);
    } else {
      reject("店铺关门了");
    }
  });
};

async function order() {
  try {
    console.log(await step(2000, "下单草莓酸奶"));
    console.log(await step(1000, "开始做草莓酸奶"));
    console.log(await step(2000, "草莓酸奶做好了"));
    console.log("test");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("结束营业");
  }
}

order();

```

## NODE的文件系统，path和fs

path常用api
```js
const path = require("path");

sampleTxt = "/Users/zhjr/Github/node_tutorial/files/sample.txt";

// dirname
console.log("dirname:", path.dirname(sampleTxt));
// basename
console.log("basename:", path.basename(sampleTxt));
// extname
console.log("extname:", path.extname(sampleTxt));

// __dirname
console.log("__dirname:", __dirname);

// __filename
console.log("__flename:", __filename);

// join
const testFile = 'test.txt'
const newPath = path.join(path.dirname(sampleTxt), testFile)
console.log('path.join():',newPath)

```
fs读取和写入都各有三种方式：同步，异步，promise.





