import express from "express";
import CartService from "./services/Cart.js";
import ProductService from "./services/Product.js";
import UserService from "./services/User.js"

const app = express();

app.use(express.json());

//! Rutas de products
app.get("/api/products", ProductService.getProducts)
app.get("/api/products/:pid", ProductService.getProductById)
app.post("/api/products", ProductService.addProduct)
app.put("/api/products/:pid", ProductService.updateProductById)
app.delete("/api/products/:pid", ProductService.deleteProductById)

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

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});