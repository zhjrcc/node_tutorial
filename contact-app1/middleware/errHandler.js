const { startSession } = require("mongoose");
const constants = require("../constant");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATE_FAILED:
      res.json({
        title: "数据格式不对",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED_FAILED:
      res.json({
        title: "未授权",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "禁止访问",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "页面不存在",
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
    default:
      res.json({
        title: "错误",
        message: err.message,
        stackTrace: err.stack
      })
      break;
  }

};
module.exports = errorHandler;
