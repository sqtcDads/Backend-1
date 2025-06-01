import fs from 'fs'
import CartModel from '../models/Cart.js'

class CartRepository {
    constructor() {
        this.path = "./src/db/carts.json";
    }


    generateNewId = (carts) => {
        if (carts.length > 0) {
            return carts[carts.length - 1].id + 1;
        } else {
            return 1;
        }
    };

    getCarts = async () => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);
        return carts
    };

    addCart = async () => {
        const newCart = { products: [] }
        const cart = await CartModel.create(newCart)
        return cart
    };

    getCartById = async (cartId) => {
        const carts = await this.getCarts()
        const cart = carts.find((c) => c.id === cartId)
        return cart
    };

    addProductToCart = async (productId, cartId, productQuantity) => {
        const cart = await CartModel.findById(cartId)
        if (!cart) return null
        const product = cart.products.find((p) => p.productId.toString() === productId)
        if (!product) {
            cart.products.push({
                productId,
                quantity: 1
            })
        } else {
            product.quantity = productQuantity
        }
        const saveCart = await cart.save()
        return saveCart
    }

    deleteProductsInCart = async (cartId) => {
        const cart = await CartModel.findById(cartId)
        cart.products = []
        const saveCart = await cart.save()
        return saveCart
    }

    updateProductsInCart = async (products, cartId) => {
        const cart = await CartModel.findById(cartId)
        cart.products = products
        const saveCart = await cart.save()
        return saveCart
    }

    deleteCartById = async (cartId) => {
        const carts = await this.getCarts();
        const newCarts = carts.filter((c) => c.id !== cartId);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(newCarts, null, 2),
            "utf-8"
        );
        return true
    };



}

export default new CartRepository();
