import { useParams } from "react-router-dom";
import ClubNavbarVertical from "../components/ClubNavbarVertical";
import ClubDashBoardHeader from "../components/ClubDashboardHeader";
import { useState, useEffect } from "react";

const ClubAddLogistics = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState(null);
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

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch(`/api/clubs/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const json = await response.json();
                setClubData(json);
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        fetchClubData();
    }, [_id]);

    useEffect(() => {
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate all mandatory fields
        if (!eventName || !itemName || quantity <= 0 || !message) {
            setError("Please fill out all mandatory fields.");
            return;
        }
        // Add your form submission logic here
        // For now, let's just reset the form fields
        setEventName("");
        setItemName("");
        setQuantity(0);
        setMessage("");
        // Display "Request sent" message
        setRequestSent(true);
        // Clear the message after 3 seconds
        setTimeout(() => {
            setRequestSent(false);
            setError(null);
        }, 3000);
    };

    const clubTitle = clubData ? clubData.title : null;
    // Filter events where organizer matches club title
    const filteredEvents = clubData ? eventsData.filter(event => event.organizer === clubTitle && event.approval === true) : [];

    console.log(`Filtered events is:`, filteredEvents);

    return (  
        <div className="ClubAddLogistics">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />    
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
                <div className="Option">
                    <label htmlFor="message">Message:  </label>
                    <input 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
                </div>
                <button type="submit">Send Logistics Request</button>
                {error && <div className="error">{error}</div>}
                {requestSent && <div className="success-message">Logistics added successfully</div>}
            </form>
        </div>
    );
}

export default ClubAddLogistics;
