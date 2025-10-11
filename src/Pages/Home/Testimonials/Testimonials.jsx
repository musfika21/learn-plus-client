import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";

const testimonialsData = [
  {
    name: "Alice Johnson",
    course: "Full Stack Web Development",
    review:
      "This platform transformed my coding skills! The courses are clear, practical, and easy to follow. I feel confident building real projects now.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    name: "David Smith",
    course: "Digital Marketing Masterclass",
    review:
      "The lessons are well-structured and the examples are very practical. I loved how I could learn at my own pace.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Maria Lopez",
    course: "Python Programming for Beginners",
    review:
      "I had zero programming experience, but the courses made everything easy to understand. Highly recommended!",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
  },
  {
    name: "James Wilson",
    course: "UI/UX Design Fundamentals",
    review:
      "The projects and exercises really helped me apply what I learned. The instructors are knowledgeable and supportive.",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        What Our Students Say
      </h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-accent rounded-xl shadow-md shadow-primary/50 p-6 flex flex-col items-center text-center hover:shadow-secondary/50 transition-shadow duration-100"
          >
            <motion.img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-secondary text-xl mb-2"
              />
            </motion.div>
            <p className="text-info mb-4">{testimonial.review}</p>
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className="text-secondary mr-1"
                />
              ))}
            </div>
            <h3 className="text-primary font-semibold">{testimonial.name}</h3>
            <span className="text-secondary text-sm">{testimonial.course}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
