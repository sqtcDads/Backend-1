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
}

export default new CartRepository();