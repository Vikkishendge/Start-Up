const { OrderItem, Product } = require('../models');

exports.createOrderItem = async (req, res, next) => {
  try {
    const { orderId, productId, quantity, discount } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const totalPrice = (product.price * quantity) - discount;

    const item = await OrderItem.create({
      orderId,
      productId,
      quantity,
      unitPrice: product.price,
      discount,
      totalPrice,
    });

    res.status(201).json({ message: 'Order item added', item });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemsByOrderId = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: { orderId: req.params.orderId },
      include: Product,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};
exports.getOrderItemById = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, {
      include: Product
    });
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    res.json(item);
  } catch (err) {
    next(err);
  }
};
exports.updateOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    const { quantity, discount } = req.body;
    const product = await Product.findByPk(item.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    item.quantity = quantity;
    item.discount = discount;
    item.unitPrice = product.price;
    item.totalPrice = (product.price * quantity) - discount;
    await item.save();

    res.json({ message: 'Order item updated', item });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    await item.destroy();
    res.json({ message: 'Order item deleted' });
  } catch (err) {
    next(err);
  }
};
exports.getAllOrderItems = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      include: Product,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};
