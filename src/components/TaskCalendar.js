// // src/components/TaskCalendar.js
// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import axios from 'axios';
// import {
//   CircularProgress,
//   Typography,
//   Container,
//   Box,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Select,
//   MenuItem,
// } from '@mui/material';

// const accessToken = '2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09'; // Replace with your access token
// const localizer = momentLocalizer(moment);

// const TaskCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [newTaskName, setNewTaskName] = useState('');
//   const [newTaskNotes, setNewTaskNotes] = useState('');
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Fetch tasks from Asana
//   const fetchTasks = async (projectId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`https://app.asana.com/api/1.0/projects/${projectId}/tasks`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//           opt_fields: 'gid,name,due_on,start_on,created_at,modified_at',
//         },
//       });

//       const formattedEvents = response.data.data.map(task => ({
//         id: task.gid,
//         title: task.name,
//         start: task.start_on ? new Date(task.start_on) : new Date(task.created_at),
//         end: task.due_on ? new Date(task.due_on) : new Date(task.modified_at),
//       }));

//       setEvents(formattedEvents);
//       setTasks(response.data.data);
//     } catch (err) {
//       setError('Failed to retrieve tasks from Asana');
//       console.error('Error fetching tasks:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks('1208480264472085');
//   }, []);

//   return (
//     <Container maxWidth={false}>
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           <Grid item xs={3}>
//             <Box sx={{ height: '100vh', overflowY: 'auto', padding: '16px', backgroundColor: '#f4f4f4', display: 'flex', flexDirection: 'column' }}>
//               <Typography variant="h4" gutterBottom>Create Task</Typography>
//               <TextField
//                 label="Task Name"
//                 variant="outlined"
//                 value={newTaskName}
//                 onChange={(e) => setNewTaskName(e.target.value)}
//                 margin="normal"
//               />
//               <TextField
//                 label="Notes"
//                 variant="outlined"
//                 value={newTaskNotes}
//                 onChange={(e) => setNewTaskNotes(e.target.value)}
//                 margin="normal"
//                 multiline
//                 rows={4}
//               />
//               <Button variant="contained" color="primary">
//                 Create Task
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={9}>
//             <Typography variant="h4" align="center" gutterBottom>Task Calendar</Typography>
//             <Calendar
//               localizer={localizer}
//               events={events}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: '80vh', margin: '50px' }}
//             />
//           </Grid>
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default TaskCalendar;



//  ======================================

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
  Select, // Add this line
  MenuItem // Add this line
} from '@mui/material';

const accessToken = '2/1208480127187658/1208479963656410:45805d07e111eb6c44afa8d7be248b09'; // Replace with your access token
const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]); // List of tasks
  const [newTaskName, setNewTaskName] = useState(''); // For task creation
  const [newTaskNotes, setNewTaskNotes] = useState(''); // For task creation notes
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Store the task being edited

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
      setTasks(response.data.data); // Store tasks for drag-and-drop feature
    } catch (err) {
      setError('Failed to retrieve tasks from Asana');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Task creation function
  const handleCreateTask = async () => {
    try {
      const newTask = {
        data: {
          name: newTaskName,
          notes: newTaskNotes,
          projects: ["1208480264472085"], // Ensure this is a valid project ID
          workspace: "1208480127187670" // Use valid workspace ID
        }
      };
      const response = await axios.post('https://app.asana.com/api/1.0/tasks', newTask, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const createdTask = response.data.data;
      setTasks([...tasks, createdTask]); // Add the new task to the local state
      setNewTaskName('');
      setNewTaskNotes('');
      await fetchTasks('1208480264472085'); // Refresh the tasks after creation
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  // Handle opening the edit dialog
  const handleTaskClick = async (task) => {
    try {
      const response = await axios.get(`https://app.asana.com/api/1.0/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          opt_fields: 'gid,name,due_on,priority,assignee',
        },
      });

      const taskData = response.data.data;
      setSelectedTask({
        gid: taskData.gid,
        name: taskData.name,
        due_on: taskData.due_on,
        start_on: taskData.start_on || '',
        priority: taskData.priority || 'Low',
        assignee: taskData.assignee ? taskData.assignee.gid : '',
      });

      setOpenEditDialog(true);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async () => {
    const updatedTasks = tasks.map(task =>
      task.gid === selectedTask.gid ? { ...selectedTask } : task
    );
    setTasks(updatedTasks);

    const updatedTaskData = {
      name: selectedTask.name,
      due_on: selectedTask.due_on || undefined,
      start_on: selectedTask.start_on || undefined,
      assignee: selectedTask.assignee ? { gid: selectedTask.assignee } : undefined,
    };

    try {
      await axios.put(
        `https://app.asana.com/api/1.0/tasks/${selectedTask.gid}`,
        { data: updatedTaskData },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      await fetchTasks('1208480264472085'); // Refresh the tasks
    } catch (error) {
      console.error('Error updating task:', error);
    }

    setOpenEditDialog(false);
  };

  useEffect(() => {
    fetchTasks('1208480264472085');
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {/* Left column: Task creation box */}
        <Grid item xs={3}>
          <Box
            sx={{
              height: '100vh', // Full page height
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#f4f4f4',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
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
            <Button variant="contained" color="primary" onClick={handleCreateTask}>
              Create Task
            </Button>
          </Box>
        </Grid>

        {/* Right column: Calendar */}
        <Grid item xs={9}>
          <Typography variant="h4" align="center" gutterBottom>Task Calendar</Typography>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '80vh', margin: '50px' }}
            onSelectEvent={handleTaskClick}
          />
        </Grid>
      </Grid>

      {/* Dialog for editing task */}
      {selectedTask && (
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            value={selectedTask.name}
            onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Start Date"
            fullWidth
            value={selectedTask.start_on || ''} // แก้ไขเป็น start_on
            onChange={(e) => setSelectedTask({ ...selectedTask, start_on: e.target.value })} // เปลี่ยนเป็น start_on
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Due Date"
            fullWidth
            value={selectedTask.due_on || ''}
            onChange={(e) => setSelectedTask({ ...selectedTask, due_on: e.target.value })}
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Select
            label="Priority"
            fullWidth
            value={selectedTask.priority}
            onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
            margin="normal"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <TextField
            label="Assignee"
            fullWidth
            value={selectedTask.assignee || ''}
            onChange={(e) => setSelectedTask({ ...selectedTask, assignee: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTask} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      
      )}
    </Container>
  );
};

export default TaskCalendar;
