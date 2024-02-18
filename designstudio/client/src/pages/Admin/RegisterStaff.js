import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container, Grid } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import GoBackButton from '../../components/layout/goback';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
  },
}));

const AddStaffMember = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    streetaddress: '',
    city: '',
    state: '',
    country: '',
    postal: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/staff/create-staff', formData);
      toast.success('Staff member added successfully!');
      setFormData({
        firstname: '',
        lastname: '',
        address: '',
        streetaddress: '',
        city: '',
        state: '',
        country: '',
        postal: '',
        email: '',
        password: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error adding staff member:', error);
      toast.error('Error adding staff member. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="flex-start">
      </Grid>
      <ToastContainer />
      <Grid container justify="center" className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Staff Member
          </Typography>
          <GoBackButton/>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="First Name" name="firstname" fullWidth value={formData.firstname} onChange={handleChange} required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Last Name" name="lastname" fullWidth value={formData.lastname} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Street Address" name="streetaddress" fullWidth value={formData.streetaddress} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="State" name="state" fullWidth value={formData.state} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Country" name="country" fullWidth value={formData.country} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Postal Code" name="postal" fullWidth value={formData.postal} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type="email" label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type="password" label="Password" name="password" fullWidth value={formData.password} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type="tel" label="Phone" name="phone" fullWidth value={formData.phone} onChange={handleChange} required />
              </Grid>
           
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Staff Member</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddStaffMember;
