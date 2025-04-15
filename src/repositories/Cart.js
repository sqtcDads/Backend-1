import fs from 'fs'


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
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);
        const id = this.generateNewId(carts);
        const newCart = { id, products: [] }
        carts.push(newCart);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, 2),
            "utf-8"
        );
        return newCart
    };

    getCartById = async (cartId) => {
        const carts = await this.getCarts()
        const cart = carts.find((c) => c.id === cartId)
        return cart
    };

    addProductToCart = async (productId, cartId) => {
        const carts = await this.getCarts()
        const cart = carts.find((c) => c.id === cartId)
        if (!cart) return
        const product = cart.products.find((p) => p.id === productId)
        if (!product) {
            cart.products.push({ id: productId, cant: 1 })
        } else {
            product.cant++
        }
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, 2),
            "utf-8"
        );

        return cart
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