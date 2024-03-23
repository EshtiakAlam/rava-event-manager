import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard'; 

export const EventDetails = () => {
    const { _id } = useParams(); // Extract event ID from URL parameters
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/${_id}`); // Fetch event details using event ID
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const eventData = await response.json();
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [_id]);

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-event');
        return () => {
            document.body.classList.remove('body-event');       // cheanup alge for load upon navigaion
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    // Fetchingg
    if (!event) {
        return <div>Loading...</div>;
    }

    // Obj to array convert
    if (!Array.isArray(event)) {
        console.log('Event data:', event);
        console.error('Event data is not an array:', event);
        const eventArray = [event];
        setEvent(eventArray);
        return <div>Error: Event data is not an array</div>;
    }
    
    return (
        <div>
            <div className="events">
                {event.map((eventItem) => (
                    <div key={eventItem._id}>
                        <EventCard event={eventItem} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventDetails;
