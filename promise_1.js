const asyncTask = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve()
    } else {
      reject()
    }
  })
}
// 说明promise是异步的。
asyncTask()
.then(() => {
  console.log(name)
})
const name = 'zhjrcc';
