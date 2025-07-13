module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OrderItem', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
        onDelete: 'CASCADE'
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    }, {
      tableName: 'order_items',
      timestamps: true,
    });
  };
  