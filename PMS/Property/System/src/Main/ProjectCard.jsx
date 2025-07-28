import React from 'react';
import '../css/Projects.css';

function ProjectCard({ title, description, image }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', color: '#2c3e50' }}>{title}</h3>
        <p style={{ color: '#555', fontSize: '0.95rem' }}>{des}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
