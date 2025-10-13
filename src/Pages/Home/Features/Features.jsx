import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faPhone,
  faLock,
  faGlobe,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const featuresData = [
  {
    title: "High Resolution",
    description: "All our class videos are in full HD and above.",
    icon: faRocket,
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help you anytime, anywhere.",
    icon: faPhone,
  },
  {
    title: "Secure Payment",
    description:
      "All payments are encrypted and processed safely through trusted methods.",
    icon: faLock,
  },
  {
    title: "Wide Coverage",
    description:
      "We cover all 64 districts with branch locations for your convenience.",
    icon: faGlobe,
  },
  {
    title: "Eco Friendly",
    description: "We use sustainable packaging to reduce environmental impact.",
    icon: faLeaf,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Features = () => {
  return (
    <div className="p-2">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-accent p-6 rounded-2xl shadow-lg shadow-primary/50 flex flex-col items-center text-center"
          >
            <FontAwesomeIcon
              icon={feature.icon}
              size="3x"
              className="text-secondary mb-4"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-sm font-medium text-info">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
