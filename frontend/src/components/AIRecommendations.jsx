import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductSkeleton } from './Skeletons';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get recommended products from backend
        const res = await axios.get('http://localhost:5000/api/products/recommended');
        setRecommendations(res.data.slice(0, 4)); // Show 4 recommendations
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast.error('Failed to load AI recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast.info('Added to wishlist!');
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-700 rounded animate-pulse w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full mb-4"
        >
          <Sparkles size={16} />
          <span className="text-sm font-semibold">AI-Powered</span>
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Recommended for You
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our AI analyzes your preferences and browsing behavior to suggest products you'll love
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
          >
            <div className="relative h-48 bg-gray-700 overflow-hidden cursor-pointer group">
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=' + product.name}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                onClick={() => navigate(`/product/${product._id}`)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=' + product.name;
                }}
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                AI Pick
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -25%
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>

              {/* Quick actions */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(product);
                  }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition"
                >
                  <Heart size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition"
                >
                  <ShoppingCart size={16} />
                </motion.button>
              </div>
            </div>

            <div className="p-4">
              <h3
                className="font-bold text-lg text-white mb-2 line-clamp-2 cursor-pointer hover:text-purple-300 transition"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-2">({product.reviews || 0})</span>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {product.description || 'High-quality product recommended by AI'}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                  <span className="text-xs text-gray-500 line-through ml-2">${(product.price * 1.3).toFixed(2)}</span>
                </div>
                <span className="text-xs text-green-400 font-semibold">Save ${(product.price * 0.3).toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
        >
          View All Products
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AIRecommendations;