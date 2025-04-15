import express from "express";
import CartService from "./services/Cart.js";
import ProductService from "./services/Product.js";
import UserManager from "./services/User.js"

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
app.get("/api/users", async (req, res) => {
    const users = await UserManager.getAllUsers();
    res.json(users);
});

app.post("/api/users", async (req, res) => {
    const newUser = await UserManager.createUser(req.body);
    res.status(201).json({ user: newUser, message: "usuario creado" });
});

app.get("/api/users/:uid", async (req, res) => {
    const user = await UserManager.getUserById(parseInt(req.params.uid));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

app.put("/api/users/:uid", async (req, res) => {
    const updatedUser = await UserManager.updateUserById(parseInt(req.params.uid), req.body);
    if (updatedUser) {
        res.json({ user: updatedUser, message: "usuario actualizado" });
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

app.delete("/api/users/:uid", async (req, res) => {
    const remainingUsers = await UserManager.deleteUserById(parseInt(req.params.uid));
    res.json({ users: remainingUsers, message: "usuario eliminado" });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});