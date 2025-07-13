const { Subcategory, Category } = require('../models');

exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;

    const subcategory = await Subcategory.create({ name, description, categoryId });

    res.status(201).json({ message: 'Subcategory created successfully', subcategory });
  } catch (err) {
    next(err);
  }
};

exports.getAllSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });

    res.status(200).json(subcategories);
  } catch (err) {
    next(err);
  }
};

exports.getSubcategoryById = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (err) {
    next(err);
  }
};

exports.updateSubcategory = async (req, res, next) => {
  try {
    const { name, description, categoryId } = req.body;

    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    subcategory.name = name || subcategory.name;
    subcategory.description = description || subcategory.description;
    subcategory.categoryId = categoryId || subcategory.categoryId;

    await subcategory.save();

    res.status(200).json({ message: 'Subcategory updated', subcategory });
  } catch (err) {
    next(err);
  }
};


exports.deleteSubcategory = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    await subcategory.destroy();
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (err) {
    next(err);
  }
};
