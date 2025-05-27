import ProductModel from "../models/Product.js";

class ProductRepository {
    constructor() {
        this.path = "./src/db/products.json";
    }

    getProducts = async () => {
        const products = await ProductModel.find({});
        return products
    };

    getProductById = async (productId) => {
        const product = await ProductModel.findById(productId).exec();
        return product
    };

    addProduct = async (newProduct) => {
        const productToAdd = {
            title: newProduct.title,
            description: newProduct.description,
            code: newProduct.code,
            price: newProduct.price,
            status: newProduct.status !== undefined ? newProduct.status : true,
            stock: newProduct.stock,
            category: newProduct.category,
            thumbnails: newProduct.thumbnails || [],
        };
        const product = await ProductModel.create(productToAdd);
        return product
    };

    updateProductById = async (productId, updatedFields) => {
        const res = await ProductModel.updateOne({ _id: productId }, updatedFields);
        if (!res)
            return
        return res
    }


    deleteProductById = async (productId) => {
        const res = await ProductModel.deleteMany({ _id: productId })
        return res
    };

}
export default new ProductRepository();