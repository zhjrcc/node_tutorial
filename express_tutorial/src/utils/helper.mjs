import bcrypt from "bcrypt"

const saltRound = 10
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRound)
  // return await bcrypt.hash(password, salt)这个写法是没必要的，async函数自动等待异步操作完成
  return bcrypt.hash(password, salt)
}

export const comparePassword = (plain, hash) => bcrypt.compareSync(plain, hash)
