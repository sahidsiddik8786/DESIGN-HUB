import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  MenuItem,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from "../../context/auth";
import StaffHeader from "./StaffHeader";
import Sidebar from "./Sidebar";


const AddAppointment = () => {
  const [auth, setAuth] = useAuth();

  console.log('Auth in component:', auth);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schedule = {
      staffId: auth.user.id, // Assuming this is how you get the logged in staff's ID
      date,
      slots: slots.map(slot => ({ startTime: slot, endTime: calculateEndTime(slot), isBooked: false }))
    };

    try {
      await axios.post('http://localhost:8080/api/appointment', schedule);
      setSuccessMessage('Schedule created successfully!');
      toast.success(setSuccessMessage);
      setDate('');
      setSlots([]);
    } catch (error) {
      setErrorMessage('Failed to create schedule');
      console.error('Error creating schedule: ', error);
    }
  };

  const handleSlotChange = (e) => {
    // Convert the comma-separated string to an array
    setSlots(e.target.value.split(',').map(s => s.trim()));
  };

  const calculateEndTime = (startTime) => {
    // Logic to calculate the end time based on the start time
    // This is a placeholder, you'll need to implement the actual logic
    return startTime; // Replace this with actual end time calculation
  };

  // ... other component code ...
  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/886023/pexels-photo-886023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: 'fixed', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <div style={backgroundStyle}>
        <StaffHeader />
        <Container maxWidth="md">
          <Box mt={8} display="flex" justifyContent="center">
            <Card>
              <CardContent>
                <Typography variant="h2" align="center" gutterBottom>Add Schedule</Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="slots"
                        label="Time Slots (comma-separated)"
                        value={slots.join(', ')}
                        onChange={handleSlotChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Create Schedule
                      </Button>
                    </Grid>
                  </Grid>
                  {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                  {successMessage && <Typography color="success">{successMessage}</Typography>}
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>

    </div> 
  );
};

export default AddAppointment;
