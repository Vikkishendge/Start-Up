const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


sequelize.sync()
  .then(() => {
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });