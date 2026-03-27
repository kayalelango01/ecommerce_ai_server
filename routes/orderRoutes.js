const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All order routes are protected

router.route('/').post(createOrder).get(getUserOrders);

module.exports = router;
