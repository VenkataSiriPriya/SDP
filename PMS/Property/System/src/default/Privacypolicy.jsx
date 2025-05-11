// src/components/PrivacyPolicy.jsx
import React from 'react';
import '../css/Privacypolicy.css'; // Optional styling

const Privacypolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="policy-title">Privacy Policy</h1>
      <p className="policy-date">Effective Date: May 11, 2025</p>

      <section className="policy-section">
        <h2>1. Introduction</h2>
        <p>
          We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
        </p>
      </section>

      <section className="policy-section">
        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, contact details, and usage data when you register or interact with our services.
        </p>
      </section>

      <section className="policy-section">
        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to provide, maintain, and improve our services, communicate with you, and ensure the security of our platform.
        </p>
      </section>

      <section className="policy-section">
        <h2>4. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal data. We may share your information with trusted partners or service providers under strict confidentiality agreements.
        </p>
      </section>

      <section className="policy-section">
        <h2>5. Data Security</h2>
        <p>
          We implement robust security measures to protect your data from unauthorized access, disclosure, or loss.
        </p>
      </section>

      <section className="policy-section">
        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
        </p>
      </section>

      <section className="policy-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
        </p>
      </section>
    </div>
  );
};

export default Privacypolicy;
