import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Button, Paper, CircularProgress } from '@mui/material';
import CustomButton from './CustomButton'; // แทนที่ด้วยเส้นทางที่ถูกต้องของ CustomButton
import TaskList from './TaskList'; // แทนที่ด้วยเส้นทางที่ถูกต้องของ TaskList
import BoardView from './BoardView'; // แทนที่ด้วยเส้นทางที่ถูกต้องของ BoardView

const ProjectManagementUI = ({ loading, error, statusCategories, getProjectsByStatus, tasks, setTasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Project Management UI (Asana-like)
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <CustomButton variant="contained" onClick={() => {/* ฟังก์ชันเพิ่มงาน */}}>
            Add Task
          </CustomButton>
          <Button variant="outlined" color="secondary" onClick={() => {/* ฟังก์ชันดึงข้อมูล */}}>
            Fetch All Workspaces and Projects
          </Button>
        </Box>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          {statusCategories.map((status) => (
            <Paper key={status} style={{ width: '30%', padding: '20px' }}>
              <Typography variant="h6" align="center" gutterBottom>
                {status}
              </Typography>
              {getProjectsByStatus(status).map((project) => (
                <Box key={project.gid} mb={2} border={1} borderColor="grey.400" p={2} borderRadius={2}>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body1">
                    Owner: {project.owner.name}
                  </Typography>
                  <Typography variant="body2">
                    Status: {project.custom_field_settings[1]?.custom_field.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    Priority: {project.custom_field_settings[0]?.custom_field.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    Members: {project.members.map(member => member.name).join(', ') || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <a href={project.permalink_url} target="_blank" rel="noopener noreferrer">View Project</a>
                  </Typography>
                </Box>
              ))}
            </Paper>
          ))}
        </Box>

        <TaskList tasks={tasks} />
        <BoardView tasks={tasks} setTasks={setTasks} />
      </Container>
    </motion.div>
  );
};

export default ProjectManagementUI;
