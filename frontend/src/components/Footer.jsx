import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-300">E-Shop</h3>
            <p className="text-gray-300 mb-4">Your ultimate online shopping destination for quality products.</p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-purple-400 cursor-pointer transition" size={20} />
              <Twitter className="hover:text-purple-400 cursor-pointer transition" size={20} />
              <Instagram className="hover:text-purple-400 cursor-pointer transition" size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-purple-400 transition">Products</Link></li>
              <li><a href="#about" className="text-gray-300 hover:text-purple-400 transition">About Us</a></li>
              <li><a href="#blog" className="text-gray-300 hover:text-purple-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-gray-300 hover:text-purple-400 transition">Contact Us</a></li>
              <li><a href="#shipping" className="text-gray-300 hover:text-purple-400 transition">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-purple-400 transition">Returns</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-purple-400 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-purple-300">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-purple-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-purple-400" />
                <span className="text-gray-300">support@eshop.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-purple-400 mt-1" />
                <span className="text-gray-300">123 Commerce Street, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-purple-800 rounded-lg p-6 mb-8">
          <h4 className="font-bold text-lg mb-2">Subscribe to Our Newsletter</h4>
          <p className="text-gray-300 mb-4">Get exclusive offers and updates!</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2024-2026 E-Shop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 hover:text-purple-400 transition">Terms of Service</a>
            <a href="#security" className="text-gray-400 hover:text-purple-400 transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;