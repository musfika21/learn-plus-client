import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBookOpen,
  faCertificate,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const statsData = [
  { label: "Students Enrolled", value: "5,000+", icon: faUserGraduate },
  { label: "Courses Available", value: "120+", icon: faBookOpen },
  { label: "Certificates Issued", value: "3,500+", icon: faCertificate },
  { label: "24/7 Support", value: "Always", icon: faHeadset },
];

const Statistics = () => {
  return (
    <div className="">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Our Achievements
      </h2>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-accent shadow-primary/20 flex flex-col items-center gap-3 hover:shadow-secondary/50 transition-transform duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FontAwesomeIcon
                icon={stat.icon}
                size="2x"
                className="text-secondary mb-2"
              />
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-1">
              {stat.value}
            </h3>
            <p className="text-info font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
