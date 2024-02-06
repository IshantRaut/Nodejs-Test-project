const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class BlogComments extends Model {
  static associate(models) {
    BlogComments.belongsTo(models.BlogContent, { foreignKey: 'blogContentId' });
  }
}

BlogComments.init(
  {
    blogContentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogContent', 
        key: 'id',
      },
    },
    commentedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Guest',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogComments',
    tableName: 'BlogComments',
  }
);

module.exports = BlogComments;
