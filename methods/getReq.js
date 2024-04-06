module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/").reverse()[0];
  const regex = /\w+-\w+/;
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (baseUrl === "/api/movie/" && !regex.test(id)) {
    res.writeHead(404, { "content-type": "application/json" });
    res.write(JSON.stringify({ title: "格式错误", message: "番号格式错误" }));
    res.end();
  } else if (baseUrl === "/api/movie/" && regex.test(id)) {
    res.setHeader("Content-type", "application/json");
    const result = req.movies.filter((movie) => {
      if (movie.code) {
        return movie.code.toUpperCase() === id.toUpperCase();
      }
    });
    if (result.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(result[0]));
      res.end();
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.write(
        JSON.stringify({ title: "番号不存在", message: "你所查找的番号不存在" })
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
