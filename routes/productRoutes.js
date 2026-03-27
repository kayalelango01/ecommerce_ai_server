const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  seedProducts,
} = require('../controllers/productController');

router.get('/seed', seedProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
