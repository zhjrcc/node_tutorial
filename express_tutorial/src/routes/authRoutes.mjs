import { Router } from "express";
import {getAuth} from "../controllers/authController.mjs"
const router = Router()

router.get('/', getAuth)

export default router
