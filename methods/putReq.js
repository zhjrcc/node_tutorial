const writeToFile = require("../util/write_to_file");
const bodyParser = require("../util/body-parser");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/").reverse()[0];
  const regex = /\w+-\w+/;

  if (baseUrl === "/api/movie/" && regex.test(id)) {
    let index = req.movies.findIndex((movie) => {
      return movie.code.toUpperCase() === id.toUpperCase();
    });
    if (index === -1) {
      res.writeHead(400, { "content-type": "application/json" });
      res.write(
        JSON.stringify({
          title: "番号不存在",
          message: "你要更新的番号不存在",
        })
      );
      res.end();
    } else {
      try {
        let body = await bodyParser(req);
        req.movies[index] = body;
        writeToFile(req.movies);
        res.writeHead(204, { "content-type": "application/json" });
        res.end();
      } catch (error) {
        console.log(error);
        res.writeHead(400, { "content-type": "application/json" });
        res.write(
          JSON.stringify({ 
            title: "数据错误",
            message: "reqest body数据不合法",
          })
        );
        res.end();
      }
    }
  } else if (baseUrl === "/api/movie/" && !regex.test(id)) {
    res.writeHead(400, { "content-type": "application/json" });
    res.write(
      JSON.stringify({
        title: "番号格式错误",
        message: "你输入番号格式错误",
      })
    );
    res.end();
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.write(
      JSON.stringify({
        title: "URL错误",
        message: "404页面未找到",
      })
    );
    res.end();
  }
};
