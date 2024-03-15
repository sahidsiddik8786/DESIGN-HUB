import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import "./design.css";
import GoBackButton from "../../components/layout/goback";

const Bookdesigns = () => {
  const [auth] = useAuth();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/slots", {
        headers: {
          Authorization: auth.token, // Set Authorization header
        },
      });
      console.log("Slots fetched:", response.data);
      setSlots(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slots", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const bookSlot = async (appointmentId, slotId) => {
    try {
      if (!auth.token) {
        toast.error("Login then only book the slot");
        return;
      }
  
      const response = await axios.post("http://localhost:8080/api/book", {
        appointmentId,
        slotId,
      });
      console.log("Slot booked:", response.data);
  
      toast.success("Slot booked successfully");
  
      // Update the slots state after successful booking
      const updatedSlots = slots.map((slot) => {
        if (slot.appointmentId === appointmentId && slot.slotId === slotId) {
          return { ...slot, isBooked: true };
        }
        return slot;
      });
  
      setSlots(updatedSlots);
    } catch (error) {
      console.error("Error booking slot", error);
      setError(error.response?.data?.message || "An error occurred");
      // Handle error, show an error message, etc.
    }
  };
  

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error}</Layout>;

  return (
    <Layout>
      <div className="slot-details-container">
      <GoBackButton />
        <h1>Book your appointment </h1>
        <h4>
          <p>
            Have questions or need assistance?
            <br />
            Schedule a free consultation with our friendly staff to get
            personalized advice.
          </p>
        </h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index}>
                <td>{new Date(slot.date).toLocaleDateString()}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
                <td>
                  {!slot.isBooked ? (
                    <button
                      className="book-button"
                      onClick={() => bookSlot(slot.appointmentId, slot.slotId)}
                    >
                      Book Slot
                    </button>
                  ) : (
                    // Add styles for a disabled look and feel
                    <span className="booked-label">Booked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Bookdesigns;
