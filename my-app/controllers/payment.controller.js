const { Payment, Order } = require('../models');

exports.createPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, amount, status, transactionId } = req.body;
    const paidAt = new Date();

    // Optional: Validate order existence before payment creation
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const payment = await Payment.create({
      orderId,
      paymentMethod,
      amount,
      status,
      transactionId,
      paidAt,
    });

    res.status(201).json({ message: 'Payment recorded', payment });
  } catch (err) {
    next(err);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      include: [Order], // Include associated order info
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [Order],
    });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = req.body.status || payment.status;
    await payment.save();

    res.json({ message: 'Payment status updated', payment });
  } catch (err) {
    next(err);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    await payment.destroy();
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentsByOrder = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      where: { orderId: req.params.orderId },
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
