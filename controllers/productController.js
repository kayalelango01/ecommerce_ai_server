const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const { seedDatabase } = require('../utils/seedData');

// @desc    Get all products with filtering
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, isNew, onSale } = req.query;
  const filter = {};

  if (category && category !== 'all') {
    filter.category = category.toLowerCase();
  }

  if (isNew === 'true') {
    filter.isNew = true;
  }

  if (onSale === 'true') {
    filter.onSale = true;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
    ];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Seed database with products
// @route   GET /api/products/seed
// @access  Public (dev utility)
const seedProducts = asyncHandler(async (req, res) => {
  const result = await seedDatabase();

  res.status(200).json({
    success: true,
    message: `Database seeded successfully with ${result.products} products`,
  });
});

module.exports = { getAllProducts, getProductById, seedProducts };
