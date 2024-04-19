import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbarVertical from './AdminNavbarVertical';
import AdminDashBoardHeader from './AdminDashboardHeader';
import { useNavigate } from "react-router-dom";
import { useEventsContext } from "../hooks/useEventsContext";
import { useAdminAuthContext } from "../hooks/useAdminAuthContext";

const AdminEventForm = () => {
    const { dispatch } = useEventsContext();
    const { admin } = useAdminAuthContext();
    const navigate = useNavigate(); // Initialize useNavigate

    const { _id } = useParams();
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [faq, setFaq] = useState([{ question: "", answer: "" }]);
    const [highlights, setHighlights] = useState([""]);
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    const handleAddFaq = () => {
        setFaq([...faq, { question: "", answer: "" }]);
    };

    const handleRemoveFaq = (index) => {
        const updatedFaq = [...faq];
        updatedFaq.splice(index, 1);
        setFaq(updatedFaq);
    };

    const handleFaqChange = (index, field, value) => {
        const updatedFaq = [...faq];
        updatedFaq[index][field] = value;
        setFaq(updatedFaq);
    };

    const handleAddHighlight = () => {
        setHighlights([...highlights, ""]);
    };

    const handleRemoveHighlight = (index) => {
        const updatedHighlights = [...highlights];
        updatedHighlights.splice(index, 1);
        setHighlights(updatedHighlights);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!admin){
            setError("you must be logged in")
            return
        }

        const event = { title, tagline, organizer, date, location, time, description, highlights, faq, link };

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

            // e.preventDefault();
            // Validate all mandatory fields
            // if (!title || !date || !time || !location) {
            //     setError("Please fill out all mandatory fields.");
            //     return;
            // }


            // Add your form submission logic here
            // For now, let's just reset the form fields

            setTitle("");
            setTagline("");
            setDate("");
            setTime("");
            setLocation("");
            setLink("");
            setDescription("");
            setOrganizer("");
            setFaq([{ question: "", answer: "" }]);
            setHighlights([""]);

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

    useEffect(() => {
        // Remove the Navbar component from the DOM when ClubDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        const bottomBarElement = document.querySelector('.BottomBar');
        if (bottomBarElement) {
            bottomBarElement.style.display = 'none';
        }

        // Show the Navbar component again when ClubDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
                bottomBarElement.style.display = 'block';
            }
        };
    }, []);

  return (
      <div className='ClubAddNewEvent'>
          <AdminNavbarVertical showHomepageButton={true}/>
          <AdminDashBoardHeader />

          <h1 className='extra'><span className='special-letter'>A</span>dd Event</h1>

          <div className="createClubEvent" style={{ marginTop: '50px', marginBottom: '100px' }}>
              <form className="createEvent" onSubmit={handleSubmit}>
                  <label>Event Title</label>
                  <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Tagline</label>
                  <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                  />
                  <label>Organizer</label>
                  <input
                      type="text"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                  />
                  <label>Date</label>
                  <input
                      type="date"
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
                  <label>Event link</label>
                  <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Highlights</label>
                  {highlights.map((highlight, index) => (
                      <div key={index}>
                          <input
                              type="text"
                              placeholder="Highlight"
                              value={highlight}
                              onChange={(e) => {
                                  const newHighlights = [...highlights];
                                  newHighlights[index] = e.target.value;
                                  setHighlights(newHighlights);
                              }}
                          />
                          <button type="button" onClick={() => handleRemoveHighlight(index)}>Remove Highlight</button>
                          <button type="button" onClick={handleAddHighlight}>Add Highlight</button>
                      </div>
                  ))}
                  <label>FAQ</label>
                  {faq.map((faqEntry, index) => (
                      <div key={index}>
                          <input
                              type="text"
                              placeholder="Question"
                              value={faqEntry.question}
                              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          />
                          <input
                              type="text"
                              placeholder="Answer"
                              value={faqEntry.answer}
                              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                          />
                          <button type="button" onClick={() => handleRemoveFaq(index)}>Remove FAQ</button>
                          <button type="button" onClick={handleAddFaq}>Add FAQ</button>
                      </div>
                  ))}
                  <button type="submit">Add Event</button>
                  {error && <div className="error">{error}</div>}
                  {requestSent && <div className="Club-Event-success-message">Event Added</div>}
              </form>
          </div>
      </div>
  );
};


export default AdminEventForm;
