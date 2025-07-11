const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));