const pFunc = (time, word) => {
  return new Promise((resolve, reject) => {
    // setTimeout，resolve
    setTimeout(()=>{
      resolve(word)
    }, time)
  });
};
// 让setTimeout按顺序执行
pFunc(2000, "第1个then")
  .then((val) => {
    console.log(val)
    return pFunc(500, "第2个then");
  })
  .then((val) => {
    console.log(val)
    return pFunc(1000, "第3个then");
  });
