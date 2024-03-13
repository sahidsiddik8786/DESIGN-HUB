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
  DialogActions,
} from "@mui/material";
import Sidebar from "./Sidebar";
import StaffHeader from "./StaffHeader";
import Calendar from "./Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customCalendarStyle.css";

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

  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [rescheduleEventId, setRescheduleEventId] = useState(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [newRescheduleStartTime, setNewRescheduleStartTime] = useState("");

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
      console.log(response.data);
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

  const handleReschedule = (eventId) => {
    console.log("Rescheduling event with ID:", eventId); // Debugging line
    setRescheduleEventId(eventId);
    setRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = async () => {
    if (!newRescheduleDate || !newRescheduleStartTime) {
      setErrorMessage("Please select a new date and time.");
      return;
    }
    const durationInHours = 1;
    const startTimeMoment = moment(newRescheduleStartTime, "HH:mm");
    const endTimeMoment = startTimeMoment.clone().add(durationInHours, "hours");
    const newEndTime = endTimeMoment.format("HH:mm");

    try {
      await axios.put(
        `http://localhost:8080/api/appointment/${rescheduleEventId}/reschedule`,
        {
          date: newRescheduleDate,
          slots: [
            {
              startTime: newRescheduleStartTime,
              endTime: newEndTime,
              isBooked: false,
            },
          ],
        }
      );
      setSuccessMessage("Appointment rescheduled successfully!");
      toast.success("Appointment rescheduled successfully!");
      fetchScheduledSlots();
    } catch (error) {
      setErrorMessage("Failed to reschedule appointment");
      console.error("Error rescheduling appointment: ", error);
    }
    setRescheduleDialogOpen(false);
  };

  const handleRescheduleDialogClose = () => {
    setRescheduleDialogOpen(false);
  };

  const sidebarStyle = {
    width: "260px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: "auto",
    background: "#333",
    zIndex: 1,
  };


  return (
    <div>
      <div style={sidebarStyle}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
 
      <StaffHeader />
 
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={0} md={6}>
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
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
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

            <Dialog
              open={rescheduleDialogOpen}
              onClose={handleRescheduleDialogClose}
            >
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogContent>
                <TextField
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  fullWidth
                />
                <Grid item xs={12}>
                  <FormControl fullWidth>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleRescheduleDialogClose}>Cancel</Button>
                <Button onClick={handleRescheduleConfirm}>Confirm</Button>
              </DialogActions>
            </Dialog>
            </Grid>
        </Grid>
    
         <div className="mt-5">
            <h1 style={{ color: "black" }}>
              Scheduled Slots
            </h1>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{moment(event.date).format("DD-MM-YYYY")}</td>
                      <td>{event.startTime}</td>
                      <td>{event.endTime}</td>
                      <td>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleReschedule(event._id)} // Ensure event._id is defined
                        >
                          Reschedule
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
            </Container>
    </div>
  );
};

export default AddAppointment;
