const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "请添加用户信息"],
    },
    email: {
      type: String,
      required: [true, "请添加电子邮箱"],
      unique: [true, "该邮箱已经被使用"],
    },
    password: {
      type: String,
      required: [true, "请填写密码"],
    },
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('User', userSchema);
