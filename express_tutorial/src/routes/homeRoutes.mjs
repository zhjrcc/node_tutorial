import { Router } from "express"
const router = Router()
import { getHome } from "../controllers/HomeController.mjs"

router.get('/', getHome)

export default router
