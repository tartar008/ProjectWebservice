// src/components/TaskCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {
  CircularProgress,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';

const accessToken = '2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09'; // Replace with your access token
const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from Asana
  const fetchTasks = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://app.asana.com/api/1.0/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          opt_fields: 'gid,name,due_on,start_on,created_at,modified_at',
        },
      });

      const formattedEvents = response.data.data.map(task => ({
        id: task.gid,
        title: task.name,
        start: task.start_on ? new Date(task.start_on) : new Date(task.created_at),
        end: task.due_on ? new Date(task.due_on) : new Date(task.modified_at),
      }));

      setEvents(formattedEvents);
      setTasks(response.data.data);
    } catch (err) {
      setError('Failed to retrieve tasks from Asana');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks('1208480264472085');
  }, []);

  return (
    <Container maxWidth={false}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box sx={{ height: '100vh', overflowY: 'auto', padding: '16px', backgroundColor: '#f4f4f4', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom>Create Task</Typography>
              <TextField
                label="Task Name"
                variant="outlined"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Notes"
                variant="outlined"
                value={newTaskNotes}
                onChange={(e) => setNewTaskNotes(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary">
                Create Task
              </Button>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" align="center" gutterBottom>Task Calendar</Typography>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '80vh', margin: '50px' }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default TaskCalendar;
