import React from 'react'
import { motion } from 'framer-motion'
import { Item } from './Item'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center border-t border-gray-100">
        <p className="text-base text-gray-400 font-light italic mb-4">
          No products match your selection.
        </p>
        <span className="editorial-label text-gray-400">
          Try resetting your active filters
        </span>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12 md:gap-y-16 w-full"
    >
      {products.map((item, i) => (
        <motion.div key={i} variants={cardVariants} className="w-full">
          <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        </motion.div>
      ))}
    </motion.div>
  )
}