const express = require('express');
const router = express.Router();

const { createSubcategory} = require('../controllers/subcategory.controller');

router.post('/', createSubcategory);
//router.get('/', getAllSubcategories);

module.exports = router;
