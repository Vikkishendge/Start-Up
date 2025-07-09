const express = require('express');
const sequelize = require('./config/db');
const UserRouter = require('./routes/user.routes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/users',UserRouter);

console.log(app.req);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
