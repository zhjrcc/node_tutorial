const fs = require("node:fs");
const path = require("node:path");
const fsPromises = require("node:fs").promises;
const {appendFileName} = require("./modules/appendFileName");

const syncWritePath = "/Users/zhjr/Github/node_tutorial/files/同步写入.txt";
const asyncWritePath = path.join(__dirname, "files", "异步写入.txt");
const promiseWritePath =
  "/Users/zhjr/Github/node_tutorial/files/promise写入.txt";
const renamePath = '/Users/zhjr/Github/node_tutorial/files/重命名文件.txt'
// 异步写入，异步读取，整体看起来会非常混乱，不建议使用，应当使用promise的方式
fs.writeFile(
  asyncWritePath,
  "这是异步写入的txt文件",
  {
    // a+表示以追加的形式写入，而不是覆盖
    // flag: "a+",
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      fs.readFile(asyncWritePath, "utf-8", (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
      });
    }
  }
);

// 同步写入，同步读取
fs.writeFileSync(syncWritePath, "这是同步写入的txt文件");
const data = fs.readFileSync(syncWritePath, "utf-8");
console.log(data);

// promise写入，promise读取，使用async/await
const promiseWrite = async () => {
  try {
    await fsPromises.writeFile(
      promiseWritePath,
      "这是async/await写入的txt文件"
    );
    const data = await fsPromises.readFile(newName, "utf-8");
    console.log(data);
  } catch (error) {
    throw error;
  }
};
promiseWrite();

const newName = path.join(
  __dirname,
  "files",
  appendFileName(renamePath, "_rename")
);
fsPromises
  .rename(renamePath, newName)
  .then(() => {
    console.log("重命名成功");
  })
  .catch((err) => {
    console.error('不存在该文件或已经重命名')
  });

// promise链
// fsPromises.writeFile(promiseWritePath, '这是promise链写入的txt文件')
// .then(() => {
//   return fsPromises.readFile(promiseWritePath, 'utf-8')
// })
// .then((val) => {
//   console.log(val)
// })
// .catch((err)=> {
//   throw err;
// })
