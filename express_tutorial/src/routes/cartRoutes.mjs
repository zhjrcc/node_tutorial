import { Router } from "express"
import { addCart, getCart } from "../controllers/cartController.mjs"
const router = Router()

router.post("/", addCart).get("/", getCart)

export default router
