const asyncHandler = require('../utils/asyncHandler');
const Cart = require('../models/Cart');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [] });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, name, brand, price, image, size, quantity } = req.body;

  if (!productId || !name || !price) {
    res.status(400);
    throw new Error('Please provide product details');
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [] });
  }

  // Check if product with same size already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId && item.size === (size || '')
  );

  if (existingItemIndex > -1) {
    // Increment quantity
    cart.items[existingItemIndex].quantity += quantity || 1;
  } else {
    // Add new item
    cart.items.push({
      productId,
      name,
      brand: brand || '',
      price,
      image: image || '',
      size: size || '',
      quantity: quantity || 1,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
