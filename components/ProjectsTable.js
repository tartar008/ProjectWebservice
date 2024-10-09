import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // สำหรับการนำทาง
import './ProjectsTable.css'; // สไตล์เพิ่มเติมถ้าต้องการ

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://app.asana.com/api/1.0/projects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // ใส่ access token ของคุณที่นี่
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProjects(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewDetails = (projectId) => {
    history.push(`/project/${projectId}`); // เปลี่ยนไปยังหน้ารายละเอียดโปรเจ็กต์
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <table style={{ border: '1px solid black', width: '100%' }}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.gid}>
            <td>{project.name}</td>
            <td>{project.owner?.name || 'N/A'}</td>
            <td>
              <button onClick={() => handleViewDetails(project.gid)}>View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
