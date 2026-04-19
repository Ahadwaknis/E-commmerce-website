import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.info('Removed from wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-2 flex items-center gap-3"
        >
          <Heart className="text-pink-500 fill-pink-500" size={40} />
          My Wishlist
        </motion.h1>
        <p className="text-gray-400 mb-8">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </p>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center py-16"
          >
            <Heart size={80} className="mx-auto mb-6 text-gray-500" />
            <h2 className="text-2xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-400 mb-8">Start adding items to your wishlist</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-700 overflow-hidden group">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x200'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ♥ Saved
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">(28)</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description || 'High-quality product'}
                  </p>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${(product.price * 1.3).toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                      In Stock
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg transition font-medium text-sm"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-950 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;