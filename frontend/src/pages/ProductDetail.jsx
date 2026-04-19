import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { ShoppingCart, Heart, Star, Check, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-12 px-4 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="text-purple-400 hover:text-purple-300">
          Back to Products
        </Link>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.info('Added to wishlist!');
  };

  const images = [product.image, ...Array(3).fill('https://via.placeholder.com/500')];
  const discount = Math.round((1 - product.price / (product.price * 1.3)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-400">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-4">
              <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  -{discount}%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-20 bg-gray-800 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === idx ? 'border-purple-500' : 'border-gray-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>
              <span className="text-gray-400">(324 reviews)</span>
            </div>

            {/* Title & Price */}
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-end gap-3 mb-6">
              <div>
                <span className="text-4xl font-bold text-purple-400">${product.price}</span>
                <span className="text-xl text-gray-500 line-through ml-4">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
              <span className="text-green-400 font-bold mb-1">You save ${(product.price * 0.3).toFixed(2)}</span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg">
              <Check size={20} className="text-green-400" />
              <span className="text-green-400">In Stock - 45+ available</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              {product.description || 'Premium quality product with excellent durability and performance. Perfect for everyday use.'}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Quantity:</label>
              <div className="flex items-center border border-gray-700 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 py-2 text-white font-medium border-l border-r border-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="px-6 py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-950 font-bold rounded-lg transition"
              >
                <Heart size={24} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="text-purple-400" size={24} />
                <div>
                  <p className="font-bold text-white">Free Shipping</p>
                  <p className="text-xs text-gray-400">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-purple-400" size={24} />
                <div>
                  <p className="font-bold text-white">Easy Returns</p>
                  <p className="text-xs text-gray-400">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-purple-400" size={24} />
                <div>
                  <p className="font-bold text-white">Secure Payment</p>
                  <p className="text-xs text-gray-400">100% encrypted checkout</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 pt-12 border-t border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={j < (4 - i % 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="font-bold text-white mb-1">Great Product!</p>
                <p className="text-gray-400 text-sm mb-3">This product exceeded my expectations. Highly recommended!</p>
                <p className="text-gray-500 text-xs">John D. - {['2 days ago', '1 week ago', '2 weeks ago', '1 month ago'][i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="h-48 bg-gray-700 overflow-hidden">
                  <img
                    src="https://via.placeholder.com/250x200"
                    alt="Product"
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 line-clamp-2">Related Product {i + 1}</h3>
                  <p className="text-purple-400 font-bold">${(Math.random() * 100 + 20).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;