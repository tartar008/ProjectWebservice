import axios from 'axios';

// ฟังก์ชันที่ดึงข้อมูล workspaces
export const getWorkspaces = async (accessToken) => {
  const response = await axios.get('https://api.asana.com/api/1.0/workspaces', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// ฟังก์ชันที่ดึงข้อมูลโปรเจกต์ใน workspace
export const getProjectsInWorkspace = async (workspaceId, accessToken) => {
  const response = await axios.get(`https://api.asana.com/api/1.0/workspaces/${workspaceId}/projects`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// ฟังก์ชันที่ดึงข้อมูลรายละเอียดโปรเจกต์
export const getProjectDetails = async (projectId, accessToken) => {
  const response = await axios.get(`https://api.asana.com/api/1.0/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// ส่งออกทั้งหมด
// ใช้การส่งออกเฉพาะเมื่อไม่มีการส่งออกซ้ำ
// ถ้าได้ส่งออกไปแล้วข้างต้น ไม่ต้องส่งออกซ้ำอีก
