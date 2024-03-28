import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useEventsContext } from "../hooks/useEventsContext";
import { useAdminAuthContext } from "../hooks/useAdminAuthContext";
const AdminEventform = () => {

  const { dispatch } = useEventsContext();
  const { admin } = useAdminAuthContext();
  const navigate = useNavigate(); // Initialize useNavigate

  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin){
        setError("you must be logged in")
        return
    }

    const event = { title, organizer, details, date, time, location };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      // Reset form fields after successful submission
      setTitle("");
      setOrganizer("");
      setDetails("");
      setDate("");
      setTime("");
      setLocation("");

      setError(null);
      console.log("New Event added", json);
      dispatch({ type: "CREATE_EVENT", payload: json });

      // Redirect to the events page
      navigate("/admin/events");
    } catch (error) {
      setError(error.message);
      console.error("Error adding event:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new event</h3>
      <label>Event Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Organizer Name</label>
      <input
        type="text"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
      />
      <label>Details</label>
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <label>Date</label>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Time</label>
      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <label>Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdminEventform;
