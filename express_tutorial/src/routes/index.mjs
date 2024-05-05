import { Router } from "express"
import userRouter from "./userRoutes.mjs"
import productRouter from "./productRoutes.mjs"
import homeRouter from "./homeRoutes.mjs"
import authRouter from "./authRoutes.mjs"
import cartRouter from "./cartRoutes.mjs"

const router = Router()
router.use("/", homeRouter)
router.use("/api/users", userRouter)
router.use("/api/products", productRouter)
router.use("/api/auth", authRouter)
router.use("/api/cart", cartRouter)

export default router
