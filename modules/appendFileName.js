const path = require("node:path");

appendFileName = (filePath, appendStr) => {
  const basename = path.basename(filePath);
  const extname = path.extname(filePath);
  const filename = extname ? basename.slice(0, -extname.length) : basename;
  return filename + appendStr + extname;
};
// module.exports = appendFileName;
exports.appendFileName = appendFileName;
