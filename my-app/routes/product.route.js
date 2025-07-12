const express = require('express');
const router = express.Router();

const { createProduct} = require('../controllers/product.controller');

// If using multer for image upload:
// const upload = require('../utils/multer');
// router.post('/', upload.single('image'), createProduct);

router.post('/', createProduct);

module.exports = router;
