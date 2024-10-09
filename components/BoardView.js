import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const BoardView = ({ tasks }) => {
  const statusCategories = ['To Do', 'In Progress', 'Done'];

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <Box display="flex" justifyContent="space-between" marginTop="20px">
      {statusCategories.map((status) => (
        <Paper key={status} style={{ width: '30%', padding: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            {status}
          </Typography>
          {getTasksByStatus(status).map((task) => (
            <Typography key={task.id} style={{ margin: '10px 0' }}>
              {task.title}
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default BoardView;
