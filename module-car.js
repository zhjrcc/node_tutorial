const honda = {
  branch: "本田",
  model: "雅阁",
};

const toyota = {
  branch: '丰田',
  module: '凯美瑞'
}

// 1.使用module.exports= 对象，导出
// module.exports = honda;
// 使用这种方式会覆盖前一个导出对象
// module.exports = toyota;

// 2.使用exports.要导出的对象名 = 对象，导出
// exports.honda = honda
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


// 总结一下:
// 导出对象就是module.exports
// 1.当直接给module.exports赋值一个对象时，则导出对象就是该对象本身。
// 2.当使用exports.属性名=对象时，则导出对象就是{属性名:对象本身},
// 当使用多个这种方式导出时，则导出对象就是{属性名1:{}, 属性名2: {}}
// 3.当使用exports.属性名={属性名1，属性名2}，则导出对象就是{属性名:{属性名1:{}, 属性名2:{}}}

// 由此可知，除了第一种情况是覆盖导出对象，从而导致导出对象直接就是该值。
// 其余使用exports.属性名的方式都是相当于在导出对象内添加属性。
