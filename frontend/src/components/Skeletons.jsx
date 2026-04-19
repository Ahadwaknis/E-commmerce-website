import { motion } from 'framer-motion';

export const ProductSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
  >
    <div className="h-48 bg-gray-700 animate-pulse"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
      <div className="flex justify-between items-center">
        <div className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-16 h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  </motion.div>
);

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen py-8 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <div className="h-96 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="flex space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="w-24 h-5 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="h-24 bg-gray-700 rounded animate-pulse"></div>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="flex space-x-4">
            <div className="w-32 h-12 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CartSkeleton = () => (
  <div className="min-h-screen py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="h-8 bg-gray-700 rounded animate-pulse mb-8 w-48"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 flex space-x-4">
              <div className="w-20 h-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="flex justify-between items-center">
                  <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between">
              <div className="w-16 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-20 h-5 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-12 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);