import React, { useState } from 'react';
import "../css/Services.css";

const services = [
  {
    title: "Property Listings",
    description: "Easily list and manage properties with detailed descriptions, high-quality images, and competitive pricing strategies.",
    icon: "🏠",
    details: [
      "Professional photography integration for stunning property showcases",
      "SEO-optimized listing descriptions to attract more potential clients",
      "Automated vacancy advertising across multiple platforms",
      "Virtual tour capabilities for remote viewing options",
      "Comparative market analysis tools to set competitive pricing"
    ]
  },
  {
    title: "Tenant Management",
    description: "Track tenant details, lease agreements, and communication all in one place with our comprehensive management system.",
    icon: "👥",
    details: [
      "Digital tenant screening with background and credit checks",
      "Secure document storage for leases and legal paperwork",
      "Tenant communication portal with message history",
      "Customizable tenant onboarding workflows",
      "Automated tenant satisfaction surveys and feedback collection"
    ]
  },
  {
    title: "Maintenance Requests",
    description: "Allow tenants to submit maintenance issues with photos and track resolution progress efficiently.",
    icon: "🛠️",
    details: [
      "Mobile-friendly maintenance request submission system",
      "Photo and video attachment capabilities for accurate issue diagnosis",
      "Prioritization tools for urgent vs. standard maintenance needs",
      "Vendor management system with qualified contractor database",
      "Real-time status updates for tenants throughout the resolution process"
    ]
  },
  {
    title: "Rent Collection",
    description: "Automate rent invoicing and collection with payment reminders and comprehensive financial reports.",
    icon: "💰",
    details: [
      "Multiple secure payment methods including ACH, credit card, and digital wallets",
      "Automated late fee calculation and notification system",
      "Customizable payment schedules for different lease agreements",
      "Rent payment history tracking and receipt generation",
      "Split payment capabilities for properties with multiple tenants"
    ]
  },
  {
    title: "Financial Reporting",
    description: "Generate detailed income, expense, and performance reports for better property management decisions.",
    icon: "📊",
    details: [
      "Comprehensive profit and loss statement generation",
      "Property-specific expense tracking and categorization",
      "Tax-ready financial reporting for year-end processing",
      "Performance metrics and analytics dashboards",
      "Budget planning tools with variance analysis capabilities"
    ]
  },
  {
    title: "Property Inspections",
    description: "Streamline inspection processes with digital checklists and automated reporting for move-in/move-out.",
    icon: "🔍",
    details: [
      "Customizable digital inspection checklists for different property types",
      "Photo documentation tools with date and timestamp verification",
      "Automated comparison between move-in and move-out conditions",
      "Maintenance issue flagging during routine inspections",
      "Professional report generation for owner and tenant documentation"
    ]
  },
];

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleContact = () => {
    if (!selectedService) return;

    const message = `Hello, I am interested in your service: "${selectedService.title}". Could you please provide more details?`;
    const phoneNumber = '15551234567'; // Replace with your real WhatsApp number
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive property management solutions to maximize your investment</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button 
                className="learn-more" 
                onClick={() => openModal(service)}
              >
                Learn more
                <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedService && (
        <div className="mm-overlay" onClick={closeModal}>
          <div className="mm-content" onClick={(e) => e.stopPropagation()}>
            <button className="mm-close" onClick={closeModal}>×</button>
            <div className="mm-header">
              <div className="mm-icon">{selectedService.icon}</div>
              <h2>{selectedService.title}</h2>
            </div>
            <p className="mm-description">{selectedService.description}</p>
            <div className="mm-details">
              <h3>Key Features</h3>
              <ul>
                {selectedService.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="mm-footer">
              <button className="c-button" onClick={handleContact}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
