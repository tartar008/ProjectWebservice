import React from 'react';

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  return (
    <div className="project-list">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span onClick={() => onSelectProject(project.id)}>{project.name}</span>
            <button onClick={() => onDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
