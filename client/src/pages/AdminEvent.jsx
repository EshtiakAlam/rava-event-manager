import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useEventsContext } from '../hooks/useEventsContext';

// Components
import { AdminEventCard } from "../components/AdminEventCard";

const AdminEvent = () => {
    const {events, dispatch}= useEventsContext()
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/");
                const json = await response.json();

                if (response.ok) {
                    dispatch({type:"SET_EVENTS", payload: json})
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [dispatch]);

    return (
        <div className="event-page">
            <div className="events">
                {events && events.map((event) => (
                    <AdminEventCard key={event._id} event={event} />
                ))}
            </div>
            <div className="add-event-container">
                <Link to="/eventform" className="add-event-link">+</Link>
            </div>

        </div>
    );
};

export default AdminEvent;
