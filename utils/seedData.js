const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  {
    name: "Velvet Noir Heels",
    brand: "Maison Élite",
    category: "shoes",
    price: 4200,
    originalPrice: null,
    sizes: ["36", "37", "38", "39", "40"],
    stock: 8,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    description: "Handcrafted velvet heels with gold-tipped stiletto. Italian leather lining."
  },
  {
    name: "Classic Oxford",
    brand: "Heritage & Co",
    category: "shoes",
    price: 8500,
    originalPrice: null,
    sizes: ["40", "41", "42", "43", "44"],
    stock: 12,
    isNew: false,
    onSale: false,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800",
    description: "Premium leather oxford shoes. Hand-stitched Goodyear welt construction."
  },
  {
    name: "Sport Luxe Sneakers",
    brand: "UrbanStride",
    category: "shoes",
    price: 6200,
    originalPrice: 8500,
    sizes: ["38", "39", "40", "41", "42", "43"],
    stock: 15,
    isNew: false,
    onSale: true,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    description: "Italian calfskin sneakers with memory foam insole. Limited edition colorway."
  },
  {
    name: "Crystal Sandals",
    brand: "Lumière",
    category: "shoes",
    price: 12000,
    originalPrice: null,
    sizes: ["36", "37", "38", "39"],
    stock: 3,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
    description: "Swarovski crystal-embellished sandals. Perfect for evening occasions."
  },
  {
    name: "Chronograph Elite",
    brand: "Zeitwerk",
    category: "watches",
    price: 28000,
    originalPrice: null,
    sizes: ["One Size"],
    stock: 5,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    description: "Swiss-made chronograph with sapphire crystal. 100m water resistance."
  },
  {
    name: "Rose Gold Minimal",
    brand: "Aurelia",
    category: "watches",
    price: 15000,
    originalPrice: null,
    sizes: ["One Size"],
    stock: 10,
    isNew: false,
    onSale: false,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
    description: "Minimalist rose gold watch with Italian leather strap. Japanese movement."
  },
  {
    name: "Diamond Bezel",
    brand: "Prestige",
    category: "watches",
    price: 45000,
    originalPrice: null,
    sizes: ["One Size"],
    stock: 2,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
    description: "18K white gold case with diamond-studded bezel. Automatic movement."
  },
  {
    name: "Smart Luxe Watch",
    brand: "TechHaut",
    category: "watches",
    price: 18000,
    originalPrice: 24000,
    sizes: ["One Size"],
    stock: 7,
    isNew: false,
    onSale: true,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    description: "Luxury smartwatch with titanium case. Health monitoring & GPS."
  },
  {
    name: "Silk Evening Gown",
    brand: "Bella Donna",
    category: "dresses",
    price: 22000,
    originalPrice: null,
    sizes: ["XS", "S", "M", "L"],
    stock: 4,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
    description: "Pure silk evening gown with hand-embroidered details. Floor length."
  },
  {
    name: "Cocktail Dress",
    brand: "Chérie",
    category: "dresses",
    price: 9500,
    originalPrice: 14000,
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    isNew: false,
    onSale: true,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    description: "Elegant cocktail dress with sequin detailing. Perfect for special occasions."
  },
  {
    name: "Floral Maxi",
    brand: "Jardin",
    category: "dresses",
    price: 7800,
    originalPrice: null,
    sizes: ["S", "M", "L", "XL"],
    stock: 11,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    description: "Hand-painted floral print on premium chiffon. Adjustable waist tie."
  },
  {
    name: "Little Black Dress",
    brand: "Noir Couture",
    category: "dresses",
    price: 11000,
    originalPrice: 16000,
    sizes: ["XS", "S", "M", "L"],
    stock: 6,
    isNew: false,
    onSale: true,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
    description: "Classic LBD reimagined with modern cuts. Premium crepe fabric."
  },
  {
    name: "Leather Tote",
    brand: "Portofino",
    category: "bags",
    price: 16000,
    originalPrice: null,
    sizes: ["One Size"],
    stock: 8,
    isNew: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    description: "Full-grain Italian leather tote. Hand-stitched with gold hardware."
  },
  {
    name: "Crossbody Clutch",
    brand: "Minaudière",
    category: "bags",
    price: 8500,
    originalPrice: null,
    sizes: ["One Size"],
    stock: 13,
    isNew: false,
    onSale: false,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
    description: "Versatile crossbody clutch with detachable chain strap. Suede interior."
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products`);

    // Seed default admin user
    const existingAdmin = await User.findOne({ email: 'admin@luxe.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@luxe.com',
        phoneNumber: '9876543210',
        password: 'Luxe@1234',
      });
      console.log('Seeded default admin user (admin@luxe.com / Luxe@1234)');
    } else {
      console.log('Admin user already exists');
    }

    return { products: createdProducts.length };
  } catch (error) {
    console.error('Seed error:', error.message);
    throw error;
  }
};

module.exports = { seedDatabase, products };
