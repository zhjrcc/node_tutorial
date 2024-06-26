const userPostValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "用户名长度应在2~10个字符之间",
    },
    notEmpty: {
      errorMessage: "用户名不能为空",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "邮箱不能为空",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "密码不能为空",
    },
  },
}
const userQueryValidationSchema = {
  filter: {
    isLength: {
      options: {
        min: 5,
        max: 10,
      },
      errorMessage: "字段在5-10个字符长度之间",
    },
    notEmpty: {
      errorMessage: "字段不能为空",
    },
  },
}

export { userPostValidationSchema, userQueryValidationSchema }
