import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SmartSearchBar = ({ isMobile = false, onClose = () => {} }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState(['laptop', 'headphones', 'phone', 'camera']);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search/${query}`);
        const products = res.data.slice(0, 5); // Limit to 5 suggestions
        setSuggestions(products);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

      navigate(`/products?search=${searchQuery}`);
      setQuery('');
      setShowSuggestions(false);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands, categories..."
          className={`${
            isMobile ? 'w-full' : 'w-80'
          } px-4 py-2 pl-10 pr-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition`}
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {/* Product Suggestions */}
            {query.length >= 2 && (
              <div className="p-2">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide px-3 py-2">
                      Products
                    </div>
                    {suggestions.map((product) => (
                      <motion.div
                        key={product._id}
                        whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                        onClick={() => handleSearch(product.name)}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-purple-500/10"
                      >
                        <img
                          src={product.image || 'https://via.placeholder.com/40x40?text=' + product.name}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=' + product.name;
                          }}
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            ${product.price} • {product.category}
                          </div>
                        </div>
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-400">{product.rating || 4.5}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : query.length >= 2 && (
                  <div className="text-center py-4 text-gray-400">
                    No products found for "{query}"
                  </div>
                )}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length < 2 && (
              <div className="border-t border-gray-700">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Recent Searches
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                    onClick={() => handleSearch(search)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-purple-500/10"
                  >
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-white text-sm">{search}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {query.length < 2 && (
              <div className="border-t border-gray-700">
                <div className="text-xs text-gray-400 uppercase tracking-wide px-3 py-2">
                  Trending
                </div>
                <div className="flex flex-wrap gap-2 px-3 pb-3">
                  {trendingSearches.map((trend, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSearch(trend)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-purple-600 text-white text-xs rounded-full transition"
                    >
                      <TrendingUp size={10} />
                      {trend}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearchBar;