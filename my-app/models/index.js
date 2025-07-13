const sequelize = require('../config/db.config');
const {DataTypes} = require('sequelize');

const User = require('./user.model')(sequelize,DataTypes);

const Product = require('./product.model')(sequelize,DataTypes);

const Category = require('./category.model')(sequelize,DataTypes);

const Subcategory = require('./subcategory.model')(sequelize, DataTypes);

const Order = require('./order.model')(sequelize, DataTypes);

const OrderItem = require('./order_item.model')(sequelize, DataTypes);

const Payment = require('./payment.model')(sequelize, DataTypes);

const Address = require('./address.model')(sequelize, DataTypes);

const Review = require('./review.model')(sequelize, DataTypes);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

Category.hasMany(Product);
Subcategory.hasMany(Product);
Product.belongsTo(Category);
Product.belongsTo(Subcategory);

Product.hasMany(Review);
Review.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Order.hasOne(Payment);
Payment.belongsTo(Order);

OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);


module.exports = { sequelize, User , Product, Category,Subcategory, Order, OrderItem, Payment, Address,Review};