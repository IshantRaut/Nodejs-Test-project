const express = require('express');
const app = express();
const sequelize = require('./config/database');
const routes = require('./routes');

const BlogContent = require('./models/BlogContent');
const BlogComments = require('./models/BlogComments');

BlogContent.hasMany(BlogComments, { foreignKey: 'blogContentId' });
BlogComments.belongsTo(BlogContent, { foreignKey: 'blogContentId' });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
    app.listen(3000);
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
