import CartRepository from "../repositories/Cart.js";

class CartService {

    addCart = async (req, res) => {
        const cart = await CartRepository.addCart();
        res.status(201).json({ cart, message: "carrito agregado" });
    };

    getCartById = async (req, res) => {
        const cartId = parseInt(req.params.cid);
        const cart = await CartRepository.getCartById(cartId);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.status(201).json({ cart, message: "Carrito encontrado" });
    };

    addProductsToCart = async (req, res) => {
        const productId = req.params.pid;
        const cartId = req.params.cid;
        const productQuantity = req.body.quantity
        const cart = await CartRepository.addProductToCart(productId, cartId, productQuantity);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.status(201).json({ cart, message: "Carrito con producto agregado" });
    };

    updateProductsInCart = async (req, res) => {
        const products = req.body.products
        const cartId = req.params.cid
        const cart = await CartRepository.updateProductsInCart(products, cartId)
        return res.status(201).json({ cart, message: "carrito actualizado" })
    }

    deleteCartById = async (req, res) => {
        const cartId = parseInt(req.params.cid);
        const result = await CartRepository.deleteCartById(cartId);
        if (!result) return res.status(501).send("No se pudo eliminar");
        res.json({ message: "carrito eliminado" });
    };

    deleteProductsInCart = async (req, res) => {
        const cartId = req.params.cid
        const cart = await CartRepository.deleteProductsInCart(cartId)
        return res.status(201).json({ cart })
    }
}
export default new CartService();
