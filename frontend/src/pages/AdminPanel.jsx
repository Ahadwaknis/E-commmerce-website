import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Users, ShoppingCart, TrendingUp, Plus, Edit, Trash2, BarChart3 } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    { _id: 1, name: 'Product 1', price: 29.99, stock: 45, sales: 230 },
    { _id: 2, name: 'Product 2', price: 49.99, stock: 23, sales: 150 },
    { _id: 3, name: 'Product 3', price: 19.99, stock: 67, sales: 420 },
  ]);

  if (!user || user.role !== 'admin') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-white text-xl mb-4">You don't have access to this page</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go to Home
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your e-commerce platform</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['dashboard', 'products', 'orders', 'users', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: ShoppingCart, label: 'Total Orders', value: '1,234', change: '+12%', color: 'purple' },
              { icon: Package, label: 'Products', value: '856', change: '+5%', color: 'blue' },
              { icon: Users, label: 'Customers', value: '5,678', change: '+23%', color: 'pink' },
              { icon: TrendingUp, label: 'Revenue', value: '$45,231', change: '+18%', color: 'green' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 rounded-lg p-6"
                >
                  <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-${stat.color}-900 bg-opacity-30`}>
                    <Icon className={`text-${stat.color}-400`} size={24} />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <span className="text-xs text-green-400">{stat.change} from last month</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
                <Plus size={20} />
                Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-gray-400 font-semibold">Product Name</th>
                    <th className="px-4 py-3 text-gray-400 font-semibold">Price</th>
                    <th className="px-4 py-3 text-gray-400 font-semibold">Stock</th>
                    <th className="px-4 py-3 text-gray-400 font-semibold">Sales</th>
                    <th className="px-4 py-3 text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      <td className="px-4 py-3 text-white font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-gray-300">${product.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 30 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{product.sales}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="p-2 bg-blue-900 text-blue-300 rounded hover:bg-blue-800 transition">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 bg-red-900 text-red-300 rounded hover:bg-red-800 transition">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: '#ORD-001', customer: 'John Doe', amount: '$249.99', status: 'Delivered' },
                { id: '#ORD-002', customer: 'Jane Smith', amount: '$159.99', status: 'In Transit' },
                { id: '#ORD-003', customer: 'Bob Johnson', amount: '$89.99', status: 'Pending' },
              ].map((order, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <div>
                    <p className="font-bold text-white">{order.id}</p>
                    <p className="text-sm text-gray-400">{order.customer}</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-400">{order.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-900 text-green-300'
                      : order.status === 'In Transit'
                      ? 'bg-blue-900 text-blue-300'
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
            <div className="space-y-3">
              {[
                { name: 'John Doe', email: 'john@example.com', joined: 'Dec 1, 2024', orders: 5 },
                { name: 'Jane Smith', email: 'jane@example.com', joined: 'Nov 15, 2024', orders: 8 },
                { name: 'Bob Johnson', email: 'bob@example.com', joined: 'Oct 20, 2024', orders: 3 },
              ].map((user, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Joined {user.joined}</p>
                    <p className="font-bold text-purple-400">{user.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 size={24} />
              Analytics Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 mb-4">Sales This Month</p>
                <div className="h-48 bg-gray-600 rounded flex items-center justify-center">
                  <p className="text-gray-400">Chart placeholder</p>
                </div>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400 mb-4">Revenue Trend</p>
                <div className="h-48 bg-gray-600 rounded flex items-center justify-center">
                  <p className="text-gray-400">Chart placeholder</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminPanel;