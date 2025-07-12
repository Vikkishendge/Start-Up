const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const subcategoryRoutes = require('./routes/subcategory.route');


app.use('/api/users', userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);

const PORT = process.env.PORT || 8080;

sequelize.authenticate()
  .then(() => {
    console.log('Connected to DB');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to connect to DB:', err));
