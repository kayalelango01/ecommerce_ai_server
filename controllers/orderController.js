const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create order from cart
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty. Add items before placing an order.');
  }

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal < 10000 ? 500 : 0;
  const total = subtotal + shipping;

  // Create order
  const order = await Order.create({
    userId: req.user._id,
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
      size: item.size,
      quantity: item.quantity,
    })),
    subtotal,
    shipping,
    total,
    status: 'pending',
  });

  // Clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    order,
  });
});

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

module.exports = { createOrder, getUserOrders };
