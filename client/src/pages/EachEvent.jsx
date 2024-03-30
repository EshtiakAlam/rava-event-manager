import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';

export const EventDetails = () => {
    const { _id } = useParams(); // Extract event ID from URL parameters
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-event');                      //NEED TP DEFINE
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        return () => {
            document.body.classList.remove('body-event');      // cleanup lagbeii
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
            //document.body.style.backgroundImage = 'none';
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const eventData = await response.json();
                console.log('Received event data:', eventData);

                if (!eventData || Object.keys(eventData).length === 0) {
                    console.error('Received unexpected event data format:', eventData);
                    setError('Error fetching event details. Please try again later.');
                    setLoading(false);
                    return;
                }

                // Check if eventData is an array or single object
                const eventArray = Array.isArray(eventData) ? eventData : [eventData];

                setEvent(eventArray);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error.message);
                setError('Error fetching event details. Please try again later.');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!event || event.length === 0) {
        return <div>No event data available</div>;
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
