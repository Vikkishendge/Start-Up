const { Subcategory, Category } = require('../models');

exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;

    // if (!name || !categoryId) {
    //   return res.status(400).json({ message: 'Name and Category ID are required' });
    // }

    // const category = await Category.findByPk(categoryId);
    // if (!category) {
    //   return res.status(404).json({ message: 'Category not found' });
    // }

    // const existing = await Subcategory.findOne({ where: { name } });
    // if (existing) {
    //   return res.status(409).json({ message: 'Subcategory already exists' });
    // }

    const subcategory = await Subcategory.create({ name, description /*categoryId*/ });

    res.status(201).json({ message: 'Subcategory created successfully', subcategory });
  } catch (err) {
    next(err);
  }
};
