import fs from "fs";
import ProductRepository from '../repositories/Product.js'

class ProductService {
    constructor() {
        this.path = "./src/db/products.json";
    }

    getProducts = async (req, res) => {
        const products = await ProductRepository.getProducts();
        res.json(products)
    };

    getProductById = async (req, res) => {
        const productId = parseInt(req.params.pid);
        const products = await ProductRepository.getProducts();
        const product = products.find((p) => p.id === productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }

    };

    addProduct = async (req, res) => {
        const newProduct = req.body;
        const products = await ProductRepository.getProducts();
        const newId =
            products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const productToAdd = {
            id: newId,
            title: newProduct.title,
            description: newProduct.description,
            code: newProduct.code,
            price: newProduct.price,
            status: newProduct.status !== undefined ? newProduct.status : true,
            stock: newProduct.stock,
            category: newProduct.category,
            thumbnails: newProduct.thumbnails || [],
        };
        products.push(productToAdd);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2),
            "utf-8"
        );
        res.status(201).json({ product: newProduct, message: "producto creado" });
    };

    updateProductById = async (req, res) => {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        const products = await ProductRepository.getProducts();
        const productIndex = products.findIndex((p) => p.id === productId);
        if (productIndex == -1)
            return res.status(404).send("Producto no encontrado");

        if (updatedFields.id) {
            delete updatedFields.id;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2),
            "utf-8"
        );

        res.json({
            product: products[productIndex],
            message: "producto actualizado",
        });
    };

    deleteProductById = async (req, res) => {
        const productId = parseInt(req.params.pid)
        const products = await ProductRepository.getProducts();
        const newProducts = products.filter((p) => p.id !== productId);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(newProducts, null, 2),
            "utf-8"
        );
        res.json({ products: newProducts, message: "producto eliminado" });
    };
}

export default new ProductService();
