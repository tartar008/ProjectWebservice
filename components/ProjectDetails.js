import React from 'react';

const ProjectDetails = ({ project }) => {
  return (
    <div className="project-details">
      <h2>Project Details</h2>
      {project ? (
        <div>
          <p><strong>ID:</strong> {project.id}</p>
          <p><strong>Name:</strong> {project.name}</p>
          <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Select a project to view details.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
