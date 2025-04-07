import fs from "fs";

class CartManager {
    constructor() {
        this.path = "./src/carts.json";
    }


    generateNewId = (carts) => {
        if (carts.length > 0) {
            return carts[carts.length - 1].id + 1;
        } else {
            return 1;
        }
    };

    addCart = async () => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);
        const id = this.generateNewId(carts);

        carts.push({ id, products: [] });
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
        return carts;
    };

    createCart = async () => {
        const carts = await this.addCart()
        return carts[carts.length - 1];
    }

    getCartById = async (cartId) => {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cartId);
        return cart;
    };

    getProductsInCartById = async (cid) => {
        const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(cartsJson);

        const cart = carts.find((cartData) => cartData.id == cid);
        return cart.products;
    }

}

export default CartManager;
