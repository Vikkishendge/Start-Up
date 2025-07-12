const {Product} = require('../models');

exports.createProduct = async(req,res,next)=>{
    try{
        const {name, description, price, margin,discount, stock} = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            margin,
            discount,
            stock
        });

        res.status(201).json({ message: 'Product Created successfully', product: newProduct });

    }catch(err)
    {
        next(err);
    }
};
