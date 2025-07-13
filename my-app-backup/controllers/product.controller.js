const { Product, Category } = require('../models');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, margin, discount, stock, categoryId, subcategoryId } = req.body;

    // Cloudinary image URL from Multer
    const imageUrl = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      description,
      price,
      margin,
      discount,
      stock,
      categoryId,
      subcategoryId,
      imageUrl,
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, margin, discount, stock, categoryId, subcategoryId } = req.body;

    // Replace image if new one uploaded
    const imageUrl = req.file ? req.file.path : product.imageUrl;

    await product.update({
      name,
      description,
      price,
      margin,
      discount,
      stock,
      categoryId,
      subcategoryId,
      imageUrl,
    });

    res.json({ message: 'Product updated', product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
