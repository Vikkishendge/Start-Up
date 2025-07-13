const { Order, OrderItem, Product, User } = require('../models');

exports.createOrder = async (req, res, next) => {
  try {
    const { userId, items, discount } = req.body;
    let total = 0;

    const order = await Order.create({ userId, discount, status: 'pending' });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) continue;

      const totalPrice = (product.price * item.quantity) - item.discount;
      total += totalPrice;

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price,
        discount: item.discount,
        totalPrice
      });
    }

    order.totalAmount = total;
    order.finalTotal = total - discount;
    await order.save();

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [User, OrderItem] });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    next(err);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [User, OrderItem]
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};
