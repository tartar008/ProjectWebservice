import axios from 'axios';

// Create a new project
export const createProject = async (projectName, workspaceGid) => {
    try {
        const response = await axios.post(
            'https://app.asana.com/api/1.0/projects',
            {
                data: {
                    name: projectName,
                    workspace: workspaceGid,
                },
            },
            {
                headers: {
                    Authorization: `Bearer 2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09`, // ใส่ Access Token ของคุณ
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error.response.data);
        throw error;
    }
};

// Fetch all projects
export const fetchProjects = async () => {
    try {
        const response = await axios.get('https://app.asana.com/api/1.0/projects', {
            headers: {
                Authorization: `Bearer 2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error.response.data);
        throw error;
    }
};

// Fetch project details by ID
export const fetchProjectDetails = async (projectId) => {
    try {
        const response = await axios.get(`https://app.asana.com/api/1.0/projects/${projectId}`, {
            headers: {
                Authorization: `Bearer 2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project details:', error.response.data);
        throw error;
    }
};

// Update a project
export const updateProject = async (projectId, updatedData) => {
    try {
        const response = await axios.put(
            `https://app.asana.com/api/1.0/projects/${projectId}`,
            {
                data: updatedData,
            },
            {
                headers: {
                    Authorization: `Bearer 2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error.response.data);
        throw error;
    }
};

// Delete a project
export const deleteProject = async (projectId) => {
    try {
        const response = await axios.delete(`https://app.asana.com/api/1.0/projects/${projectId}`, {
            headers: {
                Authorization: `Bearer 2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error.response.data);
        throw error;
    }
};
