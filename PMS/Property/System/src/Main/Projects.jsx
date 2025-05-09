import React, { useState, useRef } from "react";
import "../css/Projects.css";

const projects = [
  {
    id: 1,
    name: "Green Valley Residency",
    location: "New York City",
    description:
      "Luxury apartments with eco-friendly design. Green Valley Residency offers a peaceful and sustainable living environment in the heart of New York. The apartments feature modern amenities, beautiful landscapes, and advanced security systems for a premium lifestyle.",
    image: "images/projects/img1.jpg",
    images: ["images/projects/img11.jpg", "images/projects/img12.jpg", "images/projects/img13.jpg", "images/projects/img14.jpg", "images/projects/img15.jpg", "images/projects/img16.jpg"],
    contact: {
      name: "John Doe",
      phone: "+1 123 456 7890",
      email: "johndoe@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 2,
    name: "Sunrise Apartments",
    location: "Los Angeles",
    description: "Modern apartments with stunning views and smart home features for luxury living.",
    image: "images/img2.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Alice Smith",
      phone: "+1 321 654 0987",
      email: "alice@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 3,
    name: "Ocean Breeze Villas",
    location: "Miami",
    description: "Beachside villas offering breathtaking ocean views with luxury interiors and private pools.",
    image: "images/img1.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Michael Lee",
      phone: "+1 987 654 3210",
      email: "michael@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 4,
    name: "Mountain View Retreat",
    location: "Denver",
    description: "A serene mountain-side escape featuring nature-inspired design and a peaceful lifestyle.",
    image: "images/img4.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Sophie Green",
      phone: "+1 555 123 9876",
      email: "sophie@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 5,
    name: "City Central Heights",
    location: "Chicago",
    description: "Located at the heart of the city, these apartments offer unmatched convenience and luxury.",
    image: "images/img5.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Robert Brown",
      phone: "+1 444 222 1111",
      email: "robert@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 6,
    name: "Palm Springs Estates",
    location: "Palm Springs",
    description: "Desert-luxury living with golf courses, spas, and high-end villas.",
    image: "images/img6.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Emily Davis",
      phone: "+1 222 333 4444",
      email: "emily@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 7,
    name: "Skyline Towers",
    location: "Seattle",
    description: "Luxury skyscraper living with panoramic views and modern city life.",
    image: "images/img2.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Jason Miller",
      phone: "+1 888 777 6666",
      email: "jason@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 8,
    name: "Lakeside Residences",
    location: "Minneapolis",
    description: "Calm lakeside homes perfect for families and nature lovers.",
    image: "images/img3.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Karen White",
      phone: "+1 123 321 4567",
      email: "karen@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 9,
    name: "EcoUrban Living",
    location: "Portland",
    description: "Eco-conscious apartments built for sustainability and smart living.",
    image: "images/img1.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Daniel Thompson",
      phone: "+1 555 666 7777",
      email: "daniel@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 10,
    name: "Harbor View Condos",
    location: "San Francisco",
    description: "Bay-facing condos with premium services and unmatched views.",
    image: "images/img4.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Laura Benson",
      phone: "+1 777 888 9999",
      email: "laura@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 11,
    name: "Crystal Heights",
    location: "Houston",
    description: "Upscale residential towers in a vibrant and growing community.",
    image: "images/img5.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Thomas Gray",
      phone: "+1 101 202 3030",
      email: "thomas@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 12,
    name: "Canyon Ridge Homes",
    location: "Phoenix",
    description: "Modern desert homes with minimalist style and smart tech.",
    image: "images/img6.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Jessica Moore",
      phone: "+1 404 505 6060",
      email: "jessica@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 13,
    name: "Riverstone Villas",
    location: "Austin",
    description: "Premium living spaces with beautiful riverside views and green trails.",
    image: "images/img1.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Brian Hall",
      phone: "+1 303 404 5050",
      email: "brian@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 14,
    name: "Willow Park",
    location: "Nashville",
    description: "Tranquil suburban neighborhood with great schools and parks.",
    image: "images/img2.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Rachel Adams",
      phone: "+1 606 707 8080",
      email: "rachel@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 15,
    name: "Downtown Edge Lofts",
    location: "Boston",
    description: "Industrial-chic lofts perfect for young professionals and creatives.",
    image: "images/img3.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Kevin Reed",
      phone: "+1 111 222 3333",
      email: "kevin@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 16,
    name: "Coral Bay Apartments",
    location: "San Diego",
    description: "Resort-style living with coastal vibes and sunny patios.",
    image: "images/img4.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Tina Garcia",
      phone: "+1 909 808 7070",
      email: "tina@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 17,
    name: "Maple Grove",
    location: "Charlotte",
    description: "Modern homes in a friendly and green residential community.",
    image: "images/img5.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Nathan Scott",
      phone: "+1 212 343 4545",
      email: "nathan@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 18,
    name: "Vista Grand",
    location: "Las Vegas",
    description: "Luxury high-rise with city skyline views and entertainment spaces.",
    image: "images/img6.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Megan Taylor",
      phone: "+1 676 787 8989",
      email: "megan@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 19,
    name: "Forest Hill Residences",
    location: "Atlanta",
    description: "Elegant homes surrounded by lush forest and natural walking trails.",
    image: "images/img1.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Chris Evans",
      phone: "+1 111 999 8888",
      email: "chris@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  },
  {
    id: 20,
    name: "The Pearl Residences",
    location: "Dallas",
    description: "Contemporary living with smart amenities and curated interior design.",
    image: "images/img2.jpeg",
    images: ["images/img1.jpeg", "images/img2.jpeg", "images/img3.jpeg", "images/img4.jpeg", "images/img5.jpeg", "images/img6.jpeg"],
    contact: {
      name: "Angela Brooks",
      phone: "+1 818 999 2020",
      email: "angela@example.com",
      icon: "/images/contact-removebg-preview.png",
    },
  }
];


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="p">
        <h1 className="ph">Our Projects</h1>
        <div className="pg">
          {projects.map((project) => (
            <div key={project.id} className="pc">
              <img src={project.image} alt={project.name} className="pi" />
              <div className="pii">
                <h2>{project.name}</h2>
                <p>{project.location}</p>
                <button
                  onClick={() => handleViewDetails(project)}
                  className="pb"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>

            <div className="s-container">
              <button onClick={() => scroll("left")} className="scroll-btn">
                ◀
              </button>

              <div className="images-container" ref={scrollRef}>
                {selectedProject.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Project" className="modal-img" />
                ))}
              </div>

              <button onClick={() => scroll("right")} className="s-btn">
                ▶
              </button>
            </div>

            <div className="modal-content">
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>

              <div className="contact-section">
                <img
                  src={selectedProject.contact.icon}
                  alt="Contact"
                  className="contact-icon"
                />
                <div>
                  <p>{selectedProject.contact.name}</p>
                  <p>{selectedProject.contact.phone}</p>
                  <p>{selectedProject.contact.email}</p>
                </div>
              </div>

              <button className="contact-btn">Contact Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
