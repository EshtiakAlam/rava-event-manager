import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbarVertical from '../components/AdminNavbarVertical';
import AdminDashBoardHeader from '../components/AdminDashboardHeader';

const AdminAddLogistics = () => {
    const { eventId } = useParams(); // Assuming you have access to the event ID from the URL params
    const [eventsData, setEventsData] = useState([]);
    const [eventName, setEventName] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events data');
                }
                const eventData = await response.json();
                setEventsData(eventData);
            } catch (error) {
                console.error('Error fetching events data:', error.message);
            }
        };

        fetchEventData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate all mandatory fields
        if (!eventName || !itemName || quantity <= 0 || !message) {
            setError("Please fill out all mandatory fields.");
            return;
        }
        
        try {
            const logisticData = {
                item: itemName,
                quantity: quantity,
                approved: "true" // Assuming you want to set approved as "true" for new logistics
            };

            const response = await fetch(`/api/events/${eventId}/logistics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logisticData),
            });

            if (!response.ok) {
                throw new Error('Failed to add logistics');
            }

            // Reset form fields
            setEventName("");
            setItemName("");
            setQuantity(0);
            setMessage("");
            setRequestSent(true);
            // Clear the message after 3 seconds
            setTimeout(() => {
                setRequestSent(false);
                setError(null);
            }, 3000);
        } catch (error) {
            console.error('Error adding logistics:', error.message);
            setError("Failed to add logistics. Please try again later.");
        }
    };

    const filteredEvents = eventsData.filter(event => event.approval === 1);

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
        <div className="ClubAddLogistics" style={{marginBottom: '70px'}}>
            <AdminNavbarVertical showHomepageButton={true} />
            <AdminDashBoardHeader />    
            <h1 className='extra'><span className='special-letter'>A</span>dd Logistic Request</h1>

            <form className="createLogistics" onSubmit={handleSubmit}>
                <div className="Option">
                    <label htmlFor="eventName">Event Name: </label>
                    <select id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)}>
                        <option value="">Select Event</option>
                        {filteredEvents.map((event, index) => (
                            <option key={index} value={event.name}>{event.title}</option>
                        ))}
                    </select>
                </div>
                <div className="Option">
                    <label htmlFor="itemName">Item Name: </label>
                    <input 
                        type="text" 
                        id="itemName" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                    />
                </div>
                <div className="Option">
                    <label htmlFor="quantity">Quantity: </label>
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                </div>
                <button type="submit">Add Logistics</button>
                {error && <div className="error">{error}</div>}
                {requestSent && <div className="success-message">Logistics added successfully</div>}
            </form>
        </div>
    );
}

export default AdminAddLogistics;
