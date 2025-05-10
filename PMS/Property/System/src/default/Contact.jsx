import React, { useState } from 'react';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally, you would send formData to your backend here.
    console.log("Form submitted:", formData);

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => setSubmitted(false), 5000); // reset notification after 5s
  };

  return (
    <section className="cc-section">
      <div className="cc-container">
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? Reach out to our team below.</p>

        {submitted && <div className="contact-success">Thank you! We’ll get back to you soon.</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="sb-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
