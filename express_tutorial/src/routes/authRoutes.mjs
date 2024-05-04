import { Router } from "express"
import { login, getStatus } from "../controllers/authController.mjs"
const router = Router()

router.post("/", login).get("/status", getStatus)

export default router
