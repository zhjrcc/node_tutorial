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
// 这里必须return一个promise，下一个then才会按照顺序执行
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
