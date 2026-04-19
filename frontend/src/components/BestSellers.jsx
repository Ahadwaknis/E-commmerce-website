import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductCardSkeleton } from './SkeletonLoader';
import { useCart } from '../context/CartContext';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/best-sellers');
        setProducts(res.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <Award className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-white">⭐ Best Sellers</h2>
          <span className="ml-auto text-gray-400 text-sm">Most loved products</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition border border-yellow-500/20"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-700 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Award size={14} /> Best Seller
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-white line-clamp-2 mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-yellow-400">${product.price}</span>
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">Stock: {product.stock}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success('Added to cart!');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-2 rounded-lg transition font-medium"
                  >
                    <ShoppingCart size={16} />
                    Cart
                  </button>
                  <button
                    onClick={() => {
                      addToWishlist(product);
                      toast.info('Added to wishlist!');
                    }}
                    className="px-3 py-2 border-2 border-yellow-600 text-yellow-400 rounded-lg hover:bg-yellow-950 transition"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
