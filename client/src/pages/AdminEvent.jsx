import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useEventsContext } from '../hooks/useEventsContext';
import { useAdminAuthContext } from "../hooks/useAdminAuthContext";
// Components
import { AdminEventCard } from "../components/AdminEventCard";

const AdminEvent = () => {
    const { admin } = useAdminAuthContext();
    const { events, dispatch } = useEventsContext();
    //console.log("########");
    //console.log(admin?.token); // Using optional chaining to prevent error

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/", {
                    headers: {
                        "Authorization": `Bearer ${admin?.token}` // Using optional chaining
                    }
                });
                
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: "SET_EVENTS", payload: json });
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        if (admin?.token) { // Using optional chaining
            fetchEvents();
        }
    }, [admin?.token, dispatch]); // Using optional chaining

    return (
        <div className="event-page">
            {admin?.token ? (
                <>
                    <div className="events">
                        {events && events.map((event) => (
                            <AdminEventCard key={event._id} event={event} />
                        ))}
                    </div>
                    <div className="add-event-container">
                        <Link to="/admin/eventform" className="add-event-link">+</Link>
                    </div>
                </>
            ) : (
                <div className="message-container">
                    <p>You must be logged in as an admin to view events.</p>
                </div>
            )}
        </div>
    );
};

export default AdminEvent;

