import React, { useState, useEffect } from 'react';
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
  CardContent // Import Card and CardContent components
} from '@mui/material';

const AddAppointment = () => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch user ID after component mounts
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      // Make an API call to fetch user ID after authentication  
      const response = await axios.get(`http://localhost:8080/api/v1/auth/${userId}`); // Adjust the API endpoint as per your implementation
      if (response.data && response.data.userId) {
        // Set the user ID in state
        setUserId(response.data.userId);
      } else {
        setErrorMessage('User ID not found');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch user ID');
      console.error('Error fetching user ID: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/book', { date, slot, userId });
      setSuccessMessage('Appointment booked successfully!');
      setDate('');
      setSlot('');
    } catch (error) {
      setErrorMessage('Failed to book appointment');
      console.error('Error booking appointment: ', error);
    }
  };

  // Function to calculate available time slots based on the selected date
  const calculateAvailableTimeSlots = (selectedDate) => {
    // Add your logic to calculate available time slots based on the selected date
    // For example, you can fetch available time slots from the server based on the selected date
    // Here, I'm just returning some dummy data as an example
    return ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];
  };

  // Automatically select the first available time slot when the date changes
  useEffect(() => {
    const availableTimeSlots = calculateAvailableTimeSlots(date);
    if (availableTimeSlots.length > 0) {
      setSlot(availableTimeSlots[0]);
    }
  }, [date]);

  return (
    <Container maxWidth="md">
      <Box mt={8} display="flex" justifyContent="center">
        <Card>
          <CardContent>
            <Typography variant="h2" align="center" gutterBottom>Add Appointment</Typography>
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
                    id="slot"
                    label="Time Slot"
                    select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    required
                  >
                    {calculateAvailableTimeSlots(date).map((timeSlot) => (
                      <MenuItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" color="primary">
                      Add Appointment
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={2} textAlign="center">
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {successMessage && <Typography color="success">{successMessage}</Typography>}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AddAppointment;
