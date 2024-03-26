const path = require("path");

sampleTxt = "/Users/zhjr/Github/node_tutorial/files/sample.txt";

// dirname
console.log("dirname:", path.dirname(sampleTxt));
// basename
console.log("basename:", path.basename(sampleTxt));
// extname
console.log("extname:", path.extname(sampleTxt));

// __dirname
console.log("__dirname:", __dirname);

// __filename
console.log("__flename:", __filename);

// join
const testFile = 'test.txt'
const newPath = path.join(path.dirname(sampleTxt), testFile)
console.log('path.join():',newPath)
