module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Payment', {
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
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('paid', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'paid',
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'payments',
      timestamps: true,
    });
  };
  