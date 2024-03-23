const repl = require("repl");

// 返回一个repl实例
const local = repl.start("REPL START# ");

local.on("exit", () => {
  console.log("Good Night!");
  process.exit();
});
