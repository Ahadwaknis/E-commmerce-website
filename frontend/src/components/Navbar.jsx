import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import SmartSearchBar from './SmartSearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            E-Shop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-1 px-8">
            <SmartSearchBar />
            <Link to="/" className="text-white hover:text-purple-200 transition">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-purple-200 transition">
              Products
            </Link>
            <Link to="/cart" className="text-white hover:text-purple-200 transition">
              Cart
            </Link>
            <Link to="/login" className="text-white hover:text-purple-200 transition">
              Login
            </Link>
            <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4 bg-purple-800 w-full">
              <SmartSearchBar isMobile={true} onClose={() => setShowSearch(false)} />
            </div>
          )}
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-purple-800">
            <div className="space-y-2">
              <Link to="/" className="block px-4 py-2 text-white hover:bg-purple-700">
                Home
              </Link>
              <Link to="/products" className="block px-4 py-2 text-white hover:bg-purple-700">
                Products
              </Link>
              <Link to="/cart" className="block px-4 py-2 text-white hover:bg-purple-700">
                Cart
              </Link>
              <Link to="/login" className="block px-4 py-2 text-white hover:bg-purple-700">
                Login
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-white hover:bg-purple-700">
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}