import axios from 'axios';

const BASE_URL = 'https://app.asana.com/api/1.0';

// Get Task by Task ID
export const getTask = async (taskId, accessToken) => {
    try {
        const response = await axios.get(`https://app.asana.com/api/1.0/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data; // Return the retrieved task data
    } catch (error) {
        console.error('Failed to retrieve task from Asana:', error.response?.data || error.message);
        throw error;
    }
};


// Function to get all tasks from a workspace
export const getAllTasks = async (workspaceId, accessToken) => {
  const response = await axios.get(`https://api.asana.com/api/1.0/workspaces/${workspaceId}/tasks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// ส่งออกฟังก์ชัน
// หากมีฟังก์ชันอื่น ๆ ในไฟล์นี้ ควรส่งออกทั้งหมด


// Create a New Task
export const createTask = async (task, accessToken) => {
    const { title, description } = task;

    try {
        const response = await axios.post('https://app.asana.com/api/1.0/tasks', {
            data: {
                name: title,
                notes: description,
                workspace: '1208480127187670', // Your workspace ID
                projects: ['1208480264472085'], // Replace with your project ID
            },
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the token
            },
        });

        return response.data; // Return the created task data
    } catch (error) {
        console.error('Failed to create task in Asana:', error.response?.data || error.message);
        throw error;
    }
};
