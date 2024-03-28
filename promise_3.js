const userLogin = () => {
  // 输入用户名和密码
  console.log("输入用户名和密码");
  const username = prompt("用户名");
  const password = prompt("密码");

  return new Promise((resolve, reject) => {
    console.log("正在验证...");
    setTimeout(() => {
      if (username === "zhjrcc" && password === "zhjrcc") {
        resolve("密码验证成功");
      } else {
        reject("密码验证失败");
      }
    }, 1000);
  });
};

const goHomepage = (validation) => {
  return Promise.resolve(validation + "进入首页");
};

userLogin()
  .then((val) => {
    return goHomepage(val);
  })
  .then((val) => {
    console.log(val);
  })
  .catch((val) => {
    console.log(val);
  });
