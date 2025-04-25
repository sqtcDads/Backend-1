import express from 'express'
import ProductRender from '../render/Product.js'

const viewsRouter = express.Router()

viewsRouter.get('/', ProductRender.getProducts)

viewsRouter.get('/products', ProductRender.getProducts)
viewsRouter.get('/products/:pid', ProductRender.getProductById)
viewsRouter.get('/realtimeproducts', ProductRender.getRealTimeProducts)

export default viewsRouter