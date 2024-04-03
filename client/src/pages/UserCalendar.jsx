import formatDate from "../utils/FormatDate";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import EventDetails from "./EachEvent";

const UserCalendar = () => {
    const [events, setEvents] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);

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

    // Function to get events for the selected date
    const getEventsForDate = (date) => {
        return events ? events.filter(event => new Date(event.date).toDateString() === date.toDateString()) : [];
    }

    // The function first checks if the events array is truthy. This check ensures that we only proceed with filtering events if events is not null, undefined, or any other falsy value. If events is falsy, it returns an empty array, indicating that there are no events for the specified date.
    // If events is truthy, it uses the filter method to iterate over each event in the events array.
    // For each event, it converts the event's date to a string using the toDateString() method. This method returns a string representation of the date portion of the Date object, ignoring the time portion.
    // It then compares this string representation of the event's date with the string representation of the input date parameter using strict equality (===). This comparison ensures that we're checking for events that occur on the exact same date, regardless of the time component.
    // If the event's date matches the input date, it includes that event in the filtered array.






    // Function to handle click on previous month button
    const handlePrevMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }

    // Function to handle click on next month button
    const handleNextMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }

    return (
        <div className="Calendar">
            <div className="calendarHeader">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendarGrid">
                {Array.from({ length: 42 }).map((_, index) => {
                    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1 - selectedDate.getDay());
                    const classNames = currentDate.getMonth() === selectedDate.getMonth() ? 'calendarDay' : 'calendarDay otherMonth';
                    const eventsForDate = getEventsForDate(currentDate);
                    return (
                        <div
                            key={index}
                            className={classNames}
                            onMouseEnter={() => setHoveredDate(currentDate)}
                            onMouseLeave={() => setHoveredDate(null)}
                        >
                            <span>{currentDate.getDate()}</span>
                            {hoveredDate && hoveredDate.getTime() === currentDate.getTime() && (
                                <div className="eventPopup">
                                    {eventsForDate.map(event => (
                                        <div className="eachEvent" key={event.id}>
                                            <p1><strong>{formatDate(event.date)}</strong></p1>
                                            <p>{event.title}</p>
                                            <Link to={`/events/${event._id}`}>View Details</Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserCalendar;
