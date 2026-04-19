import { motion } from 'framer-motion';
import { CheckCircle, Circle, Truck, Package, MapPin, Clock } from 'lucide-react';

const OrderTracking = ({ orderId, onClose }) => {
  const trackingSteps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Dec 20, 2024 10:30 AM',
      completed: true,
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Payment Confirmed',
      description: 'Payment has been processed successfully',
      date: 'Dec 20, 2024 10:35 AM',
      completed: true,
      icon: CheckCircle
    },
    {
      id: 3,
      title: 'Order Processing',
      description: 'Your order is being prepared',
      date: 'Dec 20, 2024 2:00 PM',
      completed: true,
      icon: CheckCircle
    },
    {
      id: 4,
      title: 'Shipped',
      description: 'Order has been shipped from warehouse',
      date: 'Dec 21, 2024 9:00 AM',
      completed: true,
      icon: Truck
    },
    {
      id: 5,
      title: 'Out for Delivery',
      description: 'Package is out for delivery',
      date: 'Dec 22, 2024 8:30 AM',
      completed: false,
      icon: Package
    },
    {
      id: 6,
      title: 'Delivered',
      description: 'Package delivered successfully',
      date: 'Expected: Dec 22, 2024',
      completed: false,
      icon: MapPin
    }
  ];

  const currentStep = trackingSteps.findIndex(step => !step.completed);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Order Tracking</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-400 mt-2">Order ID: {orderId}</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Delivery Status</h3>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span className="text-blue-400 text-sm">Estimated delivery: Dec 22, 2024</span>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Express Delivery</p>
                  <p className="text-gray-400 text-sm">Tracking: 1Z999AA1234567890</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">On Time</p>
                  <p className="text-gray-400 text-sm">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.completed;
              const isCurrent = index === currentStep;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 ${
                    index < trackingSteps.length - 1 ? 'pb-6 border-l-2 border-gray-600 ml-6' : ''
                  }`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>

                  <div className="flex-1 pt-1">
                    <h4 className={`font-semibold ${
                      isCompleted ? 'text-white' : isCurrent ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                    <p className="text-gray-500 text-xs mt-2">{step.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Delivery Address</h4>
            <p className="text-gray-300 text-sm">
              John Doe<br />
              123 Main Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Close
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderTracking;