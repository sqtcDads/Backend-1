import ProductRepository from '../repositories/Product.js'

class ProductRender {

    getProducts = async (req, res) => {
        try {
            const products = await ProductRepository.getProducts();
            res.render('home', { products })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    };

    getProductById = async (req, res) => {
        const productId = parseInt(req.params.pid);
        const product = await ProductRepository.getProductById(productId);
        if (product) {
            res.render('product/product', { product });
        } else {
            //todo arreglar la linea cuando el producto no existe
            res.render(404).send("Producto no encontrado");
        }
    };

    addProduct = async (req, res) => {
        res.render('product/new-product');
    };

    updateProductById = async (req, res) => {
        const productId = parseInt(req.params.pid);
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
        const productId = parseInt(req.params.pid)
        const result = await ProductRepository.deleteProductById(productId)
        if (!result)
            return res.status(501).send("No se pudo eliminar");
        res.json({ message: "producto eliminado" });
    };

    getRealTimeProducts = async (req, res) => {
        try {
            const products = await ProductRepository.getProducts();
            res.render('product/realTimeProducts', { products })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }


}

export default new ProductRender();
