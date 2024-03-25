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
