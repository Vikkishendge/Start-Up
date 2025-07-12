const sequelize = require('../config/db.config');
const {DataTypes} = require('sequelize');

const User = require('./user.model')(sequelize,DataTypes);

const Product = require('./product.model')(sequelize,DataTypes);

const category = require('./category.model')(sequelize,DataTypes);

const Subcategory = require('./subcategory.model')(sequelize, DataTypes);


module.exports = { sequelize, User , Product, category,Subcategory};