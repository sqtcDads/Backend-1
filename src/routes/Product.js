import express from 'express'
import ProductService from '../services/Product.js'
import Product from "../models/Product.js"


const productRouter = express.Router()

productRouter.get("/api/products", ProductService.getProducts)
productRouter.get("/api/products/:pid", ProductService.getProductById)
productRouter.post("/api/products", ProductService.addProduct)
productRouter.put("/api/products/:pid", ProductService.updateProductById)
productRouter.delete("/api/products/:pid", ProductService.deleteProductById)
// productRouter.post("/api/view/products", formDataToJson)

productRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ status: "success", payload: products })
    } catch (error) {
        res.status(500).json({ status: "error", message: "error al recuperar productos" })
    }
})

export default productRouter