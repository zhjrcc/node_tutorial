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

