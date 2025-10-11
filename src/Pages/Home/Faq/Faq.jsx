import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faCheckCircle,
  faMobileAlt,
  faCertificate,
  faMoneyBillWave,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply browse our courses, select the one you like, and click on 'Enroll Now'. You can pay securely and start learning immediately.",
    questionIcon: faBookOpen,
    answerIcon: faCheckCircle,
  },
  {
    question: "Can I get a refund if I am not satisfied?",
    answer:
      "Yes! We offer a 7-day money-back guarantee on all courses. Just contact our support team to initiate the refund process.",
    questionIcon: faMoneyBillWave,
    answerIcon: faCheckCircle,
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Absolutely! After successfully completing a course, you will receive a verified certificate that you can share on LinkedIn or download as PDF.",
    questionIcon: faCertificate,
    answerIcon: faCheckCircle,
  },
  {
    question: "Are there any prerequisites for courses?",
    answer:
      "Most of our courses are beginner-friendly. Some advanced courses may have prerequisites listed on the course page.",
    questionIcon: faBookOpen,
    answerIcon: faCheckCircle,
  },
  {
    question: "Can I access the courses on mobile?",
    answer:
      "Yes! Our platform is fully responsive, and you can access your courses on any device including tablets and smartphones.",
    questionIcon: faMobileAlt,
    answerIcon: faCheckCircle,
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-accent p-5 rounded-xl shadow-md shadow-primary/50 cursor-pointer hover:shadow-secondary/50 hover:shadow-xl hover:scale-105 transition-transform duration-300"
            onClick={() => toggleFaq(index)}
          >
            <h3 className="text-lg md:text-xl font-semibold text-primary flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={item.questionIcon || faQuestionCircle}
                  className="text-secondary"
                />
                {item.question}
              </span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </h3>
            {openIndex === index && (
              <p className="text-info mt-3 flex items-start gap-2">
                <FontAwesomeIcon
                  icon={item.answerIcon || faCheckCircle}
                  className="text-secondary mt-1"
                />
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
