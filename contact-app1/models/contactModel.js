const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    require: [true, '请输入姓名']
  },
  email: {
    type: String,
    require: [true, '请输入邮箱']
  },
  phone: {
    type: String,
    require: [true, '请输入手机号码']
  },
}, {
  timestamps: true
})
module.exports = mongoose.model('Contact', contactSchema)
