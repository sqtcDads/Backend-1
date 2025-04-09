import fs from 'fs'

class ProductRepository {
    constructor() {
        this.path = "./src/db/products.json";
    }

    getProducts = async () => {
        const productsJson = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsJson);
        return products
    };
}

export default new ProductRepository();