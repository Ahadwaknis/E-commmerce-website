import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, LogOut, Package, Heart, Settings, Eye } from 'lucide-react';
import { useState } from 'react';
import OrderTracking from '../components/OrderTracking';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [trackingOrder, setTrackingOrder] = useState(null);

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-white text-xl mb-4">Please log in to view your dashboard</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={48} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>

              <div className="space-y-3 pb-6 border-b border-purple-600">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-purple-300" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-white text-sm truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-purple-300" />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-white text-sm">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-purple-300" />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-white text-sm">123 Main St, NY</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition">
                <Settings size={18} />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <Package className="mx-auto mb-3 text-purple-400" size={32} />
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <Heart className="mx-auto mb-3 text-pink-400" size={32} />
                <p className="text-gray-400 text-sm">Wishlist Items</p>
                <p className="text-3xl font-bold text-white">5</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <User className="mx-auto mb-3 text-blue-400" size={32} />
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-lg font-bold text-white">2 years</p>
              </div>
            </motion.div>

            {/* Order History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {[
                  { id: '#ORD-001', date: 'Dec 20, 2024', total: '$249.99', status: 'Delivered' },
                  { id: '#ORD-002', date: 'Dec 15, 2024', total: '$159.99', status: 'In Transit' },
                  { id: '#ORD-003', date: 'Dec 10, 2024', total: '$89.99', status: 'Delivered' },
                ].map((order, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                  >
                    <div>
                      <p className="font-bold text-white">{order.id}</p>
                      <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-purple-400">{order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-900 text-green-300'
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <button
                        onClick={() => setTrackingOrder(order.id)}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition"
                      >
                        <Eye size={14} />
                        Track
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Saved Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-purple-600 rounded-lg p-4">
                  <p className="font-bold text-white mb-2">Home</p>
                  <p className="text-gray-400 text-sm">123 Main Street<br />New York, NY 10001</p>
                </div>
                <div className="border-2 border-gray-700 rounded-lg p-4 hover:border-purple-600 transition cursor-pointer">
                  <button className="text-purple-400 hover:text-purple-300 font-medium">
                    + Add Address
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Order Tracking Modal */}
      {trackingOrder && (
        <OrderTracking
          orderId={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;