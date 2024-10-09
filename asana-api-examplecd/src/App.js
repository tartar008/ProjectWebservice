import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskCalendar from './components/TaskCalendar';
import Profile from './components/Profile';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Task Calendar</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<TaskCalendar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
