import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const TaskList = ({ tasks }) => {
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.gid}>
          <Card>
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
              <Typography color="textSecondary">{task.due_on ? `Due: ${task.due_on}` : 'No Due Date'}</Typography>
              <Typography>{task.notes}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
