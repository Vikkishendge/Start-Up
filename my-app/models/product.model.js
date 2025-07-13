module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    margin: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'categories', key: 'id' },
      onDelete: 'CASCADE'
    },
    subcategoryId: {
      type: DataTypes.UUID,
      references: { model: 'subcategories', key: 'id' },
      onDelete: 'SET NULL'
    }
  }, {
    timestamps: true,
    tableName: 'products',
  });
};
