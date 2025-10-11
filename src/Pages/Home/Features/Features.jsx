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
    title: "Fast Delivery",
    description:
      "Get your parcels delivered swiftly and safely across Bangladesh.",
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

const Features = () => {
  return (
    <div className="p-2 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-accent p-6 rounded-2xl shadow-lg shadow-primary/50 hover:shadow-secondary/50 hover:shadow-xl flex flex-col items-center text-center"
          >
            <FontAwesomeIcon
              icon={feature.icon}
              size="3x"
              className="text-secondary mb-4"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-sm font-medium text-info">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
