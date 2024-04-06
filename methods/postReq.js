const requestBodyParser = require("../util/body-parser");
// const crypto = require('node:crypto')
const writeToFile = require("../util/write_to_file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      // body.id = crypto.randomUUID()
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "content-type": "application/json" });
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "content-type": "application/json" });
      res.write(
        JSON.stringify({ title: "数据错误", message: "reqest body数据不合法" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.write(
      JSON.stringify({ title: "URL错误", message: "你访问的URL不存在" })
    );
    res.end();
  }
};
