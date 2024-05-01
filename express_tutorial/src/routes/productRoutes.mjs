import { Router } from "express";

const router = Router()

// @desc GET /api/products
router.get('/', (req, res) => {
  res.status(200).send([{ id: 1, name: "Snicker", price: "99元" }])
})

export default router
