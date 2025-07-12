const { Category } = require('../models');

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // if (!name) {
    //   return res.status(400).json({ message: 'Category name is required' });
    // }

    // const existing = await Category.findOne({ where: { name } });
    // if (existing) {
    //   return res.status(409).json({ message: 'Category already exists' });
    // }

    const category = await Category.create({ name, description });

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
