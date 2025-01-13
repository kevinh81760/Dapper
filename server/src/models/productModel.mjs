import mongoose from 'mongoose';

const productSchema = new mongoose.Schema
(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller
        createdAt: { type: Date, default: Date.now },
    }
);

export const Product = mongoose.model('Product', productSchema);
