import express from "express";
import http from 'http'
import CartService from "./services/Cart.js";
import UserService from "./services/User.js"
import productRouter from "./routes/Product.js"
import ProductRepository from './repositories/Product.js'
import viewsRouter from "./routes/views.router.js";
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app)
const io = new Server(server)
const PORT = 8080

app.use(bodyParser.urlencoded())
app.use(express.static('public'))

//! handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//! Render
app.use('/', viewsRouter)

app.use(express.json());

//! Rutas de products
app.use(productRouter)

//! Rutas de carts
app.post("/api/carts", CartService.addCart)
app.get("/api/carts/:cid", CartService.getCartById)
app.post("/api/carts/:cid/product/:pid", CartService.addProductsToCart)
app.delete("/api/carts/:cid", CartService.deleteCartById)

//! Rutas de users
app.get("/api/users", UserService.getAllUsers)
app.post("/api/users", UserService.createUser)
app.get("/api/users/:uid", UserService.getUserById)
app.delete("/api/users/:uid", UserService.deleteUserById)
app.put("/api/users/:uid", UserService.updateUserById)

server.listen(PORT, () => {
    console.log("Server is running on port 8080");
});
io.on("connection", (socket) => {
    socket.on("newProduct", async (productData) => {
        try {
            const newProduct = await ProductRepository.addProduct(productData);

            io.emit("productAdded", newProduct);
        } catch (error) {
            console.error("Error al añadir el producto");
        }

    })
})