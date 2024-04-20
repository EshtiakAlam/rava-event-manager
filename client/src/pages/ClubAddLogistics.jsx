import { useParams } from "react-router-dom";
import ClubNavbarVertical from "../components/ClubNavbarVertical";
import ClubDashBoardHeader from "../components/ClubDashboardHeader";
import { useState, useEffect } from "react";

const ClubAddLogistics = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState(null);
    const [eventName, setEventName] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false);


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

    const eventsData = clubData?.events;

    console.log(`EVENTS DATA KII`, eventsData);

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
        if (!eventName || !itemName || quantity <= 0 ) {
            setError("Please fill out all mandatory fields.");
            return;
        }
        // Add your form submission logic here
        // For now, let's just reset the form fields
        setEventName("");
        setItemName("");
        setQuantity(0);
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
    const filteredEvents = eventsData ? eventsData.filter(event => event.approval === 1) : [];

    console.log(`Filtered events is:`, filteredEvents);

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
                <button type="submit">Send Logistics Request</button>
                {error && <div className="error">{error}</div>}
                {requestSent && <div className="success-message">Logistics added successfully</div>}
            </form>
        </div>
    );
}

export default ClubAddLogistics;
