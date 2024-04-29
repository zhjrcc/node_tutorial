const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_FAILED:
      res.json({
        title: "验证失败",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "未找到",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "未授权",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "服务器错误",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDON:
      res.json({
        title: "禁止访问",
        message: err.message,
        stackTrace: err.stack,
      });
      break; 
  }
};

module.exports = errorHandler;
