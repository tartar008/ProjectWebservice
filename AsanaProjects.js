import React, { useEffect, useState } from 'react';
import { fetchProjects, fetchProjectDetails } from './api'; // ตรวจสอบให้แน่ใจว่า import ฟังก์ชันที่ถูกต้อง

const AsanaProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects(); // ใช้ฟังก์ชันนี้เพื่อดึงโปรเจ็กต์
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    loadProjects();
  }, []);

  const handleSelectProject = async (projectId) => {
    console.log('Selected project ID:', projectId); // log ID ที่เลือก
    try {
      const details = await fetchProjectDetails(projectId); // ดึงรายละเอียดโปรเจ็กต์
      setSelectedProject(projectId); // ตั้งค่าโปรเจ็กต์ที่เลือก
      setProjectDetails(details); // ตั้งค่ารายละเอียดโปรเจ็กต์
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  };

  return (
    <div>
      <h1>Manage Asana Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleSelectProject(project.id)}>
            {project.name}
          </li>
        ))}
      </ul>
      {selectedProject && projectDetails && (
        <div>
          <h2>Project Details</h2>
          <p>{JSON.stringify(projectDetails, null, 2)}</p> {/* แสดงรายละเอียดโปรเจ็กต์ */}
        </div>
      )}
    </div>
  );
};

export default AsanaProjects;
