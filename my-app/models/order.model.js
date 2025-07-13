module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      finalTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
      },
    }, {
      tableName: 'orders',
      timestamps: true, 
    });
  };
  