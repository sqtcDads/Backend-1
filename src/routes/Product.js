import express from 'express'
import ProductService from '../services/Product.js'


const productRouter = express.Router()

productRouter.get("/api/products", ProductService.getProducts)
productRouter.get("/api/products/:pid", ProductService.getProductById)
productRouter.post("/api/products", ProductService.addProduct)
// productRouter.post("/api/view/products", formDataToJson)
productRouter.put("/api/products/:pid", ProductService.updateProductById)
productRouter.delete("/api/products/:pid", ProductService.deleteProductById)


export default productRouter