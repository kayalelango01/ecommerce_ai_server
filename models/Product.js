const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    brand: { type: String, required: [true, 'Brand is required'], trim: true },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['shoes', 'watches', 'dresses', 'bags'],
        message: '{VALUE} is not a valid category',
      },
    },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    originalPrice: { type: Number, default: null },
    sizes: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0, min: 0 },
    isNew: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    image: { type: String, required: [true, 'Image URL is required'] },
    description: { type: String, required: [true, 'Description is required'] },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', brand: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ onSale: 1 });

module.exports = mongoose.model('Product', productSchema);
