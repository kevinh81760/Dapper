import { Product } from '../models/productModel.mjs';

export const addProduct = async (req, res) => 
{
    try {
        const { name, description, price } = req.body;

        if (!name || !price) 
        {
            return res.status(400).json({ msg: 'Name and price are required.' });
        }

        const product = new Product(
        {
            name,
            description,
            price,
            seller: req.session.userId // Associate product with the logged-in seller
        });

        await product.save();
        res.status(201).json({ msg: 'Product added successfully', product });
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const getProducts = async (req, res) => 
{
    try 
    {
        const products = await Product.find().populate('seller', 'username'); // Populate seller's username
        res.json(products);
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
