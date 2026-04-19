import { motion } from 'framer-motion';

export const SkeletonLoader = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-gray-700 rounded-lg h-48"
          />
        ))}
      </div>
    );
  }

  if (type === 'line') {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-gray-700 rounded h-4 w-full"
      />
    );
  }

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="bg-gray-700 rounded-full w-12 h-12"
    />
  );
};

export const ProductCardSkeleton = () => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="bg-gray-800 rounded-lg overflow-hidden"
  >
    <div className="h-48 bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-700 rounded w-1/2" />
      <div className="h-8 bg-gray-700 rounded" />
    </div>
  </motion.div>
);
