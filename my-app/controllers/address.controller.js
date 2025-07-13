const { Address } = require('../models');

exports.createAddress = async (req, res, next) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json({ message: 'Address created', address });
  } catch (err) {
    next(err);
  }
};

exports.getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json(address);
  } catch (err) {
    next(err);
  }
};

exports.getUserAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({ where: { userId: req.params.userId } });
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    await address.update(req.body);
    res.json({ message: 'Address updated', address });
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    await address.destroy();
    res.json({ message: 'Address deleted' });
  } catch (err) {
    next(err);
  }
};
