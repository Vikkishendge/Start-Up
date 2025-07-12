module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Subcategory', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    //   categoryId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //       model: 'categories',
    //       key: 'id',
    //     },
    //   },
    }, {
      tableName: 'subcategories',
      timestamps: true,
    });
  };
  