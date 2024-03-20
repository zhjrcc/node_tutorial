const fs = require("fs");

// 检查文件是否存在
fs.access('app.js', fs.constants.F_OK, (err) => {
  if(err) {
    console.error('文件不存在');
    process.exit(1) // 错误码1表示文件不存在
  } else {
    console.log('文件存在')
    process.exit(0) // 0表示文件存在
  }
})
