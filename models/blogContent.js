const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class BlogContent extends Model {
  static associate(models) {
    BlogContent.hasMany(models.BlogComments, { foreignKey: 'blogContentId' });
  }
}

BlogContent.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogContent',
    tableName: 'BlogContent',
  }
);

module.exports = BlogContent;
