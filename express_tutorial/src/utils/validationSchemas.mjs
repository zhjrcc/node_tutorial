const userPostValidationSchema  = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 10,
      },
      errorMessage: "用户名长度应在5~8个字符之间"
    }
  },
  email: {
    notEmpty: {
      errorMessage: "邮箱不能为空"
    }
  }
}
const userQueryValidationSchema = {
  filter: {
    isLength: {
      options: {
        min: 5,
        max: 10
      },
      errorMessage: "字段在5-10个字符长度之间"
    },
    notEmpty: {
      errorMessage: "字段不能为空"
    }
  }
}

export {userPostValidationSchema, userQueryValidationSchema}
