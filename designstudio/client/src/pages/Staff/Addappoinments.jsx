import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Sidebar from "./Sidebar";
import StaffHeader from "./StaffHeader";
import Calendar from "./Calendar";

const AddAppointment = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
  };

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);

  const generateTimeSlots = () => {
    return [
      { startTime: "10:00am", endTime: "11:00am" },
      { startTime: "11:00am", endTime: "12:00pm" },
      { startTime: "2:00pm", endTime: "3:00pm" },
      { startTime: "3:00pm", endTime: "4:00pm" },
    ];
  };

  useEffect(() => {
    setSlots(generateTimeSlots());
    fetchScheduledSlots();
  }, []);

  const fetchScheduledSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/slots");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching scheduled slots: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSlot = slots[0];
    const schedule = {
      date,
      slots: [
        {
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          isBooked: false,
        },
      ],
    };
    try {
      await axios.post("http://localhost:8080/api/appointment", schedule);
      setSuccessMessage("Schedule created successfully!");
      toast.success("Schedule created successfully!");
      setDate("");
      setSlots([]);
      fetchScheduledSlots();
    } catch (error) {
      setErrorMessage("Failed to create schedule");
      console.error("Error creating schedule: ", error);
    }
  };

  const handleSelectDate = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTimeChange = (event) => {
    const selectedSlot = slots.find(
      (slot) => slot.startTime === event.target.value
    );
    setSlots([selectedSlot]);
  };

  const sidebarStyle = {
    width: '260px', 
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto', 
    background: '#333',
    zIndex: 1, 
  }

  return (
    <div>
       <div style={sidebarStyle}>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      </div>
      <StaffHeader />
      <Container>
      <Grid container spacing={0}>
          <Grid item xs={0} md={6}> {/* Adjust the size as needed */}
            <Calendar handleSelectDate={handleSelectDate} />
          </Grid>

          <Grid item xs={12} md={6}>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Appointment</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="time-slot-label">Time Slot</InputLabel>
                    <Select
                      labelId="time-slot-label"
                      id="time-slot"
                      value={slots.length > 0 ? slots[0].startTime : ""}
                      label="Time Slot"
                      onChange={handleTimeChange}
                      required
                    >
                      {slots.map((slot, index) => (
                        <MenuItem key={index} value={slot.startTime}>
                          {slot.startTime} - {slot.endTime}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create Schedule
                  </Button>
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              {successMessage && (
                <Typography color="success">{successMessage}</Typography>
              )}
            </form>
          </DialogContent>
        </Dialog>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box width="100%" maxWidth={800} bgcolor="white" borderRadius={2} p={2}>
          <Typography variant="h5" style={{ color: "black" }}>
            Scheduled Slots
          </Typography>
          <Table style={{ backgroundColor: "white" }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Booked By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {moment(event.date).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{event.startTime}</TableCell>
                  <TableCell>{event.endTime}</TableCell>
                  <TableCell>
                    {event.bookedBy ? event.bookedBy : "None"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        </Box>
        </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddAppointment;
