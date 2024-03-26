const fs = require("node:fs");
const path = require("node:path");
const { promises: fsPromises } = require("node:fs");

const asyncFile = "/Users/zhjr/Github/node_tutorial/files/异步读取.txt";

// 异步读取文件
fs.readFile(asyncFile, "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log(data);
  }
});

// 同步读取文件
try {
  const data = fs.readFileSync(
    path.join(__dirname, "files", "同步读取.txt"),
    "utf-8"
  );
  console.log(data);
} catch (error) {
  throw error;
}

// 基于Promise的方式读取文件

promiseFile = "/Users/zhjr/Github/node_tutorial/files/fsPromise读取.txt";

const fsBasePromise = async () => {
  try {
    const data = await fsPromises.readFile(promiseFile, "utf-8");
    console.log(data);
  } catch (error) {
    throw error;
  }
};
fsBasePromise();

// then的方式
// fsPromises.readFile(promiseFile, 'utf-8')
// .then((data)=>{
//   console.log(data)
// })
// .catch((err) =>{
//   throw err;
// })

