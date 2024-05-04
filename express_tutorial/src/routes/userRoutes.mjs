import { Router } from "express"
import { checkSchema } from "express-validator"
import {
  userPostValidationSchema,
  userQueryValidationSchema,
} from "../utils/validationSchemas.mjs"
import { resolveIndexByUserId } from "../middleware/resolveIndexByUserId.mjs"
const router = Router()
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  patchUser,
} from "../controllers/userController.mjs"

router
  .get("/", checkSchema(userQueryValidationSchema), getAllUsers)
  .post("/", checkSchema(userPostValidationSchema), addUser)

// 使用中间件在程序中的位置很重要，中间件位置后面的路由都将会先经过中间件，而中间件之前的则不会经过中间件
router
  .use("/:id", resolveIndexByUserId)
  .get("/:id", getUser)
  .put("/:id", updateUser)
  .patch("/:id", patchUser)
  .delete("/:id", deleteUser)
export default router
