const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const productController = require('../controllers/product.controller');

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
