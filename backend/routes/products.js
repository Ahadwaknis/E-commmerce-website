const express = require('express');

const router = express.Router();

const products = [
  { _id: '1', name: 'Premium Wireless Headphones', description: 'Noise-cancelling, 30-hour battery, premium sound quality with touch controls', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', category: 'Electronics', stock: 15, rating: 4.8, reviews: 324, trending: true, best_seller: true },
  { _id: '2', name: 'Ultra 4K Smartphone', description: 'Latest flagship with 5G, 108MP camera, beautiful AMOLED display', price: 899.99, image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop', category: 'Electronics', stock: 22, rating: 4.9, reviews: 512, best_seller: true },
  { _id: '3', name: 'Professional Laptop', description: 'Intel i9, 32GB RAM, RTX 4090, Perfect for creators', price: 2499.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', category: 'Electronics', stock: 8, rating: 4.7, reviews: 210 },
  { _id: '4', name: 'Smart Watch Pro', description: 'AMOLED display, fitness tracking, 7-day battery', price: 349.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', category: 'Electronics', stock: 35, rating: 4.6, reviews: 198, trending: true },
  { _id: '5', name: 'Premium Camera', description: '45MP sensor, 8K video, professional-grade mirrorless', price: 3999.99, image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop', category: 'Electronics', stock: 5, rating: 4.9, reviews: 89 },
  { _id: '6', name: 'Wireless Earbuds', description: 'Active noise cancelling, 8-hour battery, premium design', price: 129.99, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop', category: 'Electronics', stock: 50, rating: 4.5, reviews: 445, best_seller: true },
  { _id: '7', name: 'Portable Charger 65W', description: 'Fast charging, 25000mAh capacity, compact design', price: 59.99, image: 'https://images.unsplash.com/photo-1609042231346-079ad53ba1d7?w=400&h=300&fit=crop', category: 'Accessories', stock: 100, rating: 4.7, reviews: 567, trending: true },
  { _id: '8', name: 'Premium USB-C Cable', description: '100W fast charging, durable braided design, 2m length', price: 19.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop', category: 'Accessories', stock: 200, rating: 4.4, reviews: 234 },
  { _id: '9', name: 'Designer Phone Case', description: 'Premium leather, RFID protection, slim profile', price: 39.99, image: 'https://images.unsplash.com/photo-1618164436241-92473d4d00da?w=400&h=300&fit=crop', category: 'Accessories', stock: 75, rating: 4.6, reviews: 189 },
  { _id: '10', name: 'Screen Protector Pack', description: 'Tempered glass, anti-fingerprint, easy installation (3 pack)', price: 14.99, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop', category: 'Accessories', stock: 150, rating: 4.5, reviews: 312 },
  { _id: '11', name: 'Mechanical Keyboard RGB', description: 'Cherry MX switches, RGB backlit, aluminum frame', price: 149.99, image: 'https://images.unsplash.com/photo-1587829191301-4e8cda956554?w=400&h=300&fit=crop', category: 'Computing', stock: 30, rating: 4.8, reviews: 278, trending: true },
  { _id: '12', name: '4K USB Webcam', description: '4K @ 30fps, auto-focus, built-in mic, professional streaming', price: 189.99, image: 'https://images.unsplash.com/photo-1587566487407-3dc2f31bbdfd?w=400&h=300&fit=crop', category: 'Computing', stock: 20, rating: 4.6, reviews: 145 },
  { _id: '13', name: 'Gaming Mouse Pro', description: 'Laser sensor, 16000 DPI, customizable buttons, ergonomic', price: 69.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop', category: 'Computing', stock: 40, rating: 4.7, reviews: 201 },
  { _id: '14', name: 'Monitor Stand Pro', description: 'Aluminum, adjustable, supports up to 35 inch monitors', price: 129.99, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', category: 'Computing', stock: 25, rating: 4.5, reviews: 98 },
  { _id: '15', name: 'Premium Desk Lamp', description: 'LED, adjustable brightness, USB charging port built-in', price: 89.99, image: 'https://images.unsplash.com/photo-1565636192335-14c02fd1b13f?w=400&h=300&fit=crop', category: 'Office', stock: 35, rating: 4.6, reviews: 167, best_seller: true }
];

router.get('/', (req, res) => res.json(products));

// Get trending products
router.get('/trending', (req, res) => {
  const trending = products.filter(p => p.trending).slice(0, 6);
  res.json(trending);
});

// Get best sellers
router.get('/best-sellers', (req, res) => {
  const bestSellers = products.filter(p => p.best_seller).slice(0, 6);
  res.json(bestSellers);
});

// Get recommended products
router.get('/recommended', (req, res) => {
  const recommended = products.sort(() => Math.random() - 0.5).slice(0, 8);
  res.json(recommended);
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category.toLowerCase() === req.params.category.toLowerCase());
  res.json(categoryProducts);
});

// Search products
router.get('/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );
  res.json(results);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

router.post('/', (req, res) => {
  const product = { ...req.body, _id: Date.now().toString() };
  products.push(product);
  res.json(product);
});

router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;