import express from "express";
import CartManager from "./CartManager.js";
import ProductManager from "./ProductManager.js";

const app = express();
const cartManager = new CartManager();
const productManager = new ProductManager();

app.use(express.json());

//! Rutas de products
app.get("/api/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

app.get("/api/products/:pid", async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.post("/api/products", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json({ product: newProduct, message: "producto creado" });
});

app.put("/api/products/:pid", async (req, res) => {
    const updatedProduct = await productManager.updateProductById(parseInt(req.params.pid), req.body);
    if (updatedProduct) {
        res.json({ product: updatedProduct, message: "producto actualizado" });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.delete("/api/products/:pid", async (req, res) => {
    const remainingProducts = await productManager.deleteProductById(parseInt(req.params.pid));
    res.json({ products: remainingProducts, message: "producto eliminado" });
});

//! Rutas de carts
app.post("/api/carts", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json({ cart: newCart, message: "carrito creado" });
});

app.get("/api/carts/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }
    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    if (updatedCart) {
        res.json({ cart: updatedCart, message: "producto añadido al carrito" });
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

//! Rutas de users
app.get("/api/users", async (req, res) => {
    const users = await userManager.getAllUsers();
    res.json(users);
});

app.post("/api/users", async (req, res) => {
    const newUser = await userManager.createUser(req.body);
    res.status(201).json({ user: newUser, message: "usuario creado" });
});

app.get("/api/users/:uid", async (req, res) => {
    const user = await userManager.getUserById(parseInt(req.params.uid));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

app.put("/api/users/:uid", async (req, res) => {
    const updatedUser = await userManager.updateUserById(parseInt(req.params.uid), req.body);
    if (updatedUser) {
        res.json({ user: updatedUser, message: "usuario actualizado" });
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

app.delete("/api/users/:uid", async (req, res) => {
    const remainingUsers = await userManager.deleteUserById(parseInt(req.params.uid));
    res.json({ users: remainingUsers, message: "usuario eliminado" });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});