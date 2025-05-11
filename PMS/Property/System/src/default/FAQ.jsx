// src/components/FAQ.jsx
import React, { useState } from 'react';
import '../css/FAQ.css'; // Optional: for custom styling

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the purpose of this platform?',
      answer: 'This platform is designed to help users manage and track administrative tasks efficiently, including managing users, data, and analytics.',
    },
    {
      question: 'How can I add new data?',
      answer: 'You can use the "Add" button available in each section to add new entries. Fill in the required form and submit.',
    },
    {
      question: 'How do I edit existing entries?',
      answer: 'Each row of data has an "Edit" button. Click it to modify the data in a pre-filled form.',
    },
    {
      question: 'Can I delete entries?',
      answer: 'Yes, click the "Delete" button next to the item you want to remove. You will be prompted to confirm the action.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, your data is stored securely with appropriate encryption and access controls.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
