import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Import `toast` here

function Reset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match'); // Use `toast.error` here
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/update-password', { newPassword });
      console.log(response.data);

      // Check if the password was updated successfully
      if (response.data.message === 'Password updated successfully') {
        toast.success('Password updated successfully'); // Use `toast.success` here
        // Redirect to the login page after a successful password reset
        navigate('/login');
      } else {
        // Display an error message to the user
        toast.error('Password update failed'); // Use `toast.error` here
        // Handle other error scenarios if needed
      }
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      toast.error('Password update failed'); // Use `toast.error` here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>New Password:</label>
      <input type="password" value={newPassword} onChange={handlePasswordChange} />
      <label>Confirm Password:</label>
      <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <button type="submit">Update Password</button>
      <Toaster position="top-center" />
    </form>
  );
}

export default Reset;
