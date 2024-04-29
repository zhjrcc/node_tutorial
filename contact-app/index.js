const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contact", require("./routers/contactRouter"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`服务器运行在: ${PORT}`);
});
