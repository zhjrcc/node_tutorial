import { Router } from "express";
import { addCart } from "../controllers/cartController.mjs";
const router = Router()

router.post('/', addCart)

export default router
