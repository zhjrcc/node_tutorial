const path = require('path');  
  
let filePath = '/path/to/your/file';  
  
// 获取文件名  
let fileName = path.basename(filePath);  
  
// 获取文件后缀  
let fileExtension = path.extname(filePath);  
  
// 获取文件名（不包括后缀）  
let fileNameWithoutExtension = fileExtension?fileName.slice(0, -fileExtension.length):fileName;

console.log(fileNameWithoutExtension);  // 输出：file
