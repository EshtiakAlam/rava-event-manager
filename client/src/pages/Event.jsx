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
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        return () => {
            document.body.classList.remove('body-event-main');      // cleanup lagbeii
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
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

            <h2><span class="special-letter">T</span>HIS MONTH</h2>
            <div className="Info">
                <div className = "InfoContent">
                    {thisMonthEvents.map((event, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ImagePart">

                            </div>
                            <div className="ContentPart">
                                <h3><strong>{event.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Date:</span> { formatDate(event.date) }</b></p>
                                    <Link to={`/events/${event._id}`}></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2><span class="special-letter">U</span>PCOMING EVENTS</h2>
            <div className="Info">
                <div className = "InfoContent">
                    {futureEvents.map((event, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ImagePart">

                            </div>
                            <div className="ContentPart">
                                <h3><strong>{event.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Date:</span> { formatDate(event.date) }</b></p>
                                    <Link to={`/events/${event._id}`}></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
>>>>>>> origin/shafi_events_working_5.0
            </div>

        </div>
    );
};

export default Event;
