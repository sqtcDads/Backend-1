import ProductRepository from '../repositories/Product.js'

class ProductService {

    getProducts = async (req, res) => {
        const { limit = 10, query = "", sort = "asc", page = 1 } = req.query;
        const products = await ProductRepository.getProducts(limit, query, sort, page);
        const docQuantity = await ProductRepository.getDocumentCount()
        const totalPages = Math.ceil(docQuantity / limit)
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const prevUrl = new URL(fullUrl)
        const nextUrl = new URL(fullUrl)
        prevUrl.searchParams.set("page", page - 1)
        nextUrl.searchParams.set("page", +page + 1)
        const hasNextPage = totalPages > page ? true : false
        const hasPrevPage = page == 1 ? false : true

        res.json({
            "status": "succes",
            "payload": products,
            "totalPages": totalPages,
            "prevPage": page == 1 ? null : page - 1,
            "nextPage": totalPages > page ? +page + 1 : null,
            "page": +page,
            "hasPrevPage": hasPrevPage,
            "hasNextPage": hasNextPage,
            "prevLink": hasPrevPage ? prevUrl : null,
            "nextLink": hasNextPage ? nextUrl : null
        })
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
