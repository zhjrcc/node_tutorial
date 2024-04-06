const makeApiCall = (time) => {
  return new Promise((resolve, reject) => {
    if(time > 5000) {
      reject('时间太长了')
    } else {
      setTimeout(()=>{
        resolve('这个promise间隔时间是' + time)
      }, time)
    }
  })
}
// makeApiCall(1000)
// .then((val) => {
//   console.log(val)
// })

const multiApiCall = [makeApiCall(1000), makeApiCall(2000), makeApiCall(2000)]

// 返回的是一个数组，每一个值按顺序对应每一个promise
// 会一直等，直到promise数组中所有都执行完，也就是resolve或者reject
// 只要其中一个reject，就会结束
Promise.all(multiApiCall).then(
  (vals) => {
    console.log(vals)
  }
)
.catch((err) => {
  console.log(err)
})

// 返回的是一个值，该值是在promise数组中执行最快完成的一个
// 只要完成其中任何一个，就会立刻结束
// 只要其中有一个reject，全部结束
// Promise.race(multiApiCall).then(
//   (val) => {
//     console.log(val)
//   }
// )
// .catch((err) => {
//   console.log(err)
// })
