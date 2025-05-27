import express from "express";
import http from 'http'
import productRouter from "./routes/Product.js"
import viewsRouter from "./routes/views.router.js";
import cartRouter from "./routes/Cart.js";
import userRouter from "./routes/User.js";
import ProductRepository from './repositories/Product.js'
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import connectMongoDB from "./config/db.js"


const app = express();
await connectMongoDB()

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
app.use(cartRouter)

//! Rutas de users
app.use(userRouter)

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