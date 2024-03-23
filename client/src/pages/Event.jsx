import formatDate from "../utils/FormatDate";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Event = () => {
    const [events, setEvents] = useState(null);
    const [thisMonthEvents, setThisMonthEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch("/api/events/");
            const json = await response.json();

            if (response.ok) {
                setEvents(json);
            }
        };

        fetchEvents();
    }, []);

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-event-main');
        return () => {
            document.body.classList.remove('body-event-main');      // cleanup lagbeii
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    useEffect(() => {
        if (events) {
            const currentDate = new Date();
            const thisMonth = currentDate.getMonth();
            const thisYear = currentDate.getFullYear();
            
            const thisMonthEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
            });

            const futureEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > currentDate;
            });

            // Sort 
            thisMonthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Update 
            setThisMonthEvents(thisMonthEvents);
            setFutureEvents(futureEvents);
        }
    }, [events]);

    return (
        <div className="event-page">
            <div className='Upperpart'>
                    <h1><strong>DON'T MISS OUT</strong></h1>
                    <h4>Discover events around your campus</h4>
            </div>

            <h2>EVENTS THIS MONTH</h2>
            <div className="Info">
                {thisMonthEvents.map((event, index) => (
                    <div className="EachInfo" key={index}>
                        <h3>{event.title}</h3>
                        <p>Date: { formatDate(event.date) }</p>
                        <Link to={`/events/${event._id}`}>See event details</Link>
                    </div>
                ))}
            </div>

            <h2>UPCOMING EVENTS</h2>
            <div className="Info">
                {futureEvents.map((event, index) => (
                    <div className="EachInfo" key={index}>
                        <h3>{event.title}</h3>
                        <p>Date: { formatDate(event.date) }</p>
                        <Link to={`/events/${event._id}`}>See event details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Event;
