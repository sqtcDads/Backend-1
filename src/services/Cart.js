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

    createCart = async () => {
        const carts = await this.addCart()
        return carts[carts.length - 1];
    }

    getCartById = async (cartId) => {
        const cart = await CartService.getCartById(parseInt(req.params.cid));

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).send("Carrito no encontrado");
        }
    };

    getProductsInCartById = async (cid) => {
        const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(cartsJson);

        const cart = carts.find((cartData) => cartData.id == cid);
        return cart.products;
    }

}

export default new CartService();
