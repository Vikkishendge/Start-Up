const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const subcategoryRoutes = require('./routes/subcategory.route');
const orderRoutes = require('./routes/order.route');
const orderItemRoutes = require('./routes/order_item.route');
const paymentRoutes = require('./routes/payment.route');
const addressRoutes = require('./routes/address.route');
const reviewRoutes = require('./routes/review.route');



app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes);

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
