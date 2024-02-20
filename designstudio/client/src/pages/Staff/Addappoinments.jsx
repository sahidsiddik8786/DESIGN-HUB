import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:8080/users/${userId}`); // Adjust the API endpoint as per your implementation
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

  return (
    <div>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time Slot:</label>
          <input type="text" value={slot} onChange={(e) => setSlot(e.target.value)} required />
        </div>
        <button type="submit">Add Appointment</button>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
      </form>
    </div>
  );
};

export default AddAppointment;
