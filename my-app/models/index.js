const sequelize = require('../config/db');

const User = require('./user.model')(sequelize);

module.exports={
    User
};