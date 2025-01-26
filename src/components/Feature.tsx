"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import {
  HiTranslate,
  HiGlobe,
  HiLightningBolt,
  HiUserGroup,
} from "react-icons/hi";

export default function Feature() {
  const features = [
    {
      title: "Real-time Translation",
      description:
        "Instantly translate between sign language and text or speech with lightning-fast processing.",
      icon: HiTranslate,
      color: "#FF6B6B",
    },
    {
      title: "Multiple Sign Languages",
      description:
        "Comprehensive support for various sign languages from around the world, promoting global accessibility.",
      icon: HiGlobe,
      color: "#4ECDC4",
    },
    {
      title: "AI-Powered Accuracy",
      description:
        "Harness the power of advanced AI models for high-precision translations and natural interactions.",
      icon: HiLightningBolt,
      color: "#FFD93D",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Intuitive design that ensures accessibility for all age groups and tech-savviness levels.",
      icon: HiUserGroup,
      color: "#6BCB77",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 md:py-40 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-700/50 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 tracking-tight text-gray-900 dark:text-white"
        >
          Key Features
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="h-full"
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
