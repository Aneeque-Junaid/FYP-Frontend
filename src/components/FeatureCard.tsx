"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: IconType;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl h-full flex flex-col justify-between"
    >
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-4 flex-shrink-0"
          style={{ color }}
        >
          <Icon />
        </motion.div>
        <h3 className="text-xl font-semibold mb-3 tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
