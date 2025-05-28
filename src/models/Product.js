import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        index: "text"
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    tags: {
        type: [String],
        required: false
    },
    code: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    thumbnails: {
        type: [String],
        required: false,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const ProductModel = mongoose.model("Product", productSchema)

export default ProductModel;