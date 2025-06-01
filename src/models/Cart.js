import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
        default: []
    },
    createdAt: { type: Date, default: Date.now }
});

const CartModel = mongoose.model("Cart", cartSchema)

export default CartModel;