import { Router } from "express";
import { getAllProducts } from "../controllers/productController.mjs";
const router = Router()

// @desc GET /api/products
router.get('/', getAllProducts)

export default router
