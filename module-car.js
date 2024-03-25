// const honda = {
//   branch: "本田",
//   model: "雅阁",
// };

// const toyota = {
//   branch: '丰田',
//   module: '凯美瑞'
// }
// 1.使用module.exports= 对象，导出
// module.exports = honda;
// 使用这种方式会覆盖前一个导出对象
// module.exports = toyota;

// 2.使用exports.要导出的对象名 = 对象，导出
// exports.car = honda
//使用这种方式时，可以在导入时使用解构赋值的方式{car} = require('module-car')
// exports.car = {honda, toyota}

//3.使用exports.要导出的对象 = 值，导出
//使用这种方式时，可以在导入时使用解构赋值的方式{honda, toyota} = require('module-car')
exports.honda = {
  branch: "本田",
  model: "雅阁",
};
exports.toyota = {
  branch: "丰田",
  model: "凯美瑞",
};
