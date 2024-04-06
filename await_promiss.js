const pFun = (time) => {
  return () =>
    new Promise((resolve, reject) => {
      if (0 < time <= 50000) {
        setTimeout(()=> {
          resolve('此次时间间隔是' + time + 'ms')
        }, time)
      } else {
        reject('超时')
      }
    });
};

// 这是一个函数数组，pFun()返回的是一个函数，数组的每个元素都是一个函数，
// 每个函数返回的是一个promise
pFunArr = [pFun(2000), pFun(1000), pFun(500)]

// 使用async/await，按顺序执行每一个Promise
async function asyncPromise() {
  for(const req of pFunArr) {
    const result = await req();
    console.log(result)
  }
}
asyncPromise()
