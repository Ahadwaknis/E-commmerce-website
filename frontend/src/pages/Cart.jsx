import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">Cart</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">Add some products to get started!</p>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
            >
              Continue Shopping
            </Link>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Cart Features (Simplified)</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Product management</li>
                <li>Quantity controls</li>
                <li>Order summary</li>
                <li>Coupon codes</li>
                <li>Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;