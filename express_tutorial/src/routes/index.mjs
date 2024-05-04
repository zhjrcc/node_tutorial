import { Router } from "express"
import userRouter from "./userRoutes.mjs"
import productRouter from "./productRoutes.mjs"
import homeRouter from './homeRoutes.mjs'
import authRouter from './authRoutes.mjs'
const router = Router()
router.use('/', homeRouter)
router.use("/api/users", userRouter)
router.use("/api/products", productRouter)
router.use('/api/auth',authRouter)

export default router
