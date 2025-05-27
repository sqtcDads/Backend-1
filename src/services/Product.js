import ProductRepository from '../repositories/Product.js'

class ProductService {

    getProducts = async (req, res) => {
        const products = await ProductRepository.getProducts();
        res.json(products)
    };

    getProductById = async (req, res) => {
        const productId = req.params.pid
        const product = await ProductRepository.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    };

    addProduct = async (req, res) => {
        const newProduct = req.body;
        const product = await ProductRepository.addProduct(newProduct)
        res.status(201).json({ product, message: "producto creado" });
    };

    updateProductById = async (req, res) => {
        const productId = req.params.pid
        const updatedFields = req.body;
        const updatedProduct = await ProductRepository.updateProductById(productId, updatedFields)
        if (!updatedProduct)
            return res.status(404).send("Producto no encontrado");
        res.json({
            product: updatedProduct,
            message: "producto actualizado",
        });
    };

    deleteProductById = async (req, res) => {
        const productId = req.params.pid
        const result = await ProductRepository.deleteProductById(productId)
        console.log(result)
        if (result.deletedCount == 0)
            return res.status(501).send("no existe product con ese id");
        res.json({ message: "producto eliminado" });
    };
}

export default new ProductService();
