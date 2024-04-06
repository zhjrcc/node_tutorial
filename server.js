const http = require("node:http");
require("dotenv").config();
const movies = require("./data/movies.json");
const getReq = require('./methods/getReq')
const postReq = require('./methods/postReq')
const deleteReq = require('./methods/deleteReq')
const putReq = require('./methods/putReq')


const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.writeHead(404, { "content-type": "application/json" });
      res.write(
        JSON.stringify({ title: "URL错误", message: "你访问的URL不存在" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`服务器：localhost:${PORT}`);
});
