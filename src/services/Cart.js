import fs from "fs";
import CartRepository from '../repositories/Cart.js'

class CartService {
    constructor() {
        this.path = "./src/db/carts.json";
    }

    addCart = async (req, res) => {
        const cart = await CartRepository.addCart()
        res.status(201).json({ cart, message: "carrito agregado" });
    };

    getCartById = async (req, res) => {
        const cartId = parseInt(req.params.cid)
        const cart = await CartRepository.getCartById(cartId);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.status(201).json({ cart, message: "Carrito encontrado" })
    };

    getProductsInCartById = async (req, res) => {
        const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(cartsJson);

        const cart = carts.find((cartData) => cartData.id == cid);
        return cart.products;
    }

    addProductsToCart = async (req, res) => {

    }

    deleteCartById = async (req, res) => {

    }
}

export default new CartService();
