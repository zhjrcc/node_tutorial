import { Router } from "express"
import { login, getStatus, logout } from "../controllers/authController.mjs"
import "../strategies/local-strategy.mjs"
import passport from "passport"
const router = Router()

router
  .post("/", passport.authenticate("local"), login)
  .post("/logout", logout)
  .get("/status", getStatus)

export default router
