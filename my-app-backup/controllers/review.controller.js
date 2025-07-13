const { Review, Product } = require('../models');

exports.createReview = async (req, res, next) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await Review.create({ productId, userId, rating, comment });
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    next(err);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: Product });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, { include: Product });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

exports.getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: Product,
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const { rating, comment } = req.body;
    await review.update({ rating, comment });
    res.json({ message: 'Review updated', review });
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};
