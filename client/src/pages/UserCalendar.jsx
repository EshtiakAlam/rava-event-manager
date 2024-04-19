import formatDate from "../utils/FormatDate";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import EventDetails from "./EachEvent";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

    // get events for the selected date
    const getEventsForDate = (date) => {
        return events ? events.filter(event => new Date(event.date).toDateString() === date.toDateString()) : [];
    }

    // events array null hoile empty array returned
    // null na hoile array ta filter korbo
    // arrow function taking event as parameter; 
    // The new keyword in JavaScript is used to create instances of objects from constructor functions. 
    // In the context of new Date(event.date), it is used to create a new Date object based on the value of event.date.
    // If the event's date matches the input date, it includes that event in the filtered array.
    // .toDtaeString() method returns a string representation of the date portion of the Date object, ignoring the time portion.







    // previous month button
    const handlePrevMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    }

    //  next month button
    const handleNextMonth = () => {
        setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    }

    // handleNextMonth is an arrow function that, when called, updates the selectedDate state variable to the first day of the next month. 
    // It uses the previous value of selectedDate to calculate the new date.
    // arrow function with one parameter prevDate 
    // This parameter represents the previous value of the selectedDate state variable.
    // how new object being made: =========================================================================
    // creates a new Date object representing the first day of the next month. 
    // getFullYear() and getMonth() methods of the previous date (prevDate) to get the year and month components. 
    // It then adds 1 to the month component to move to the next month. 
    // The day component is set to 1 to represent the first day of the month.

    return (
        <div className="Calendar">
            <div className="calendarHeader">
                <button onClick={handlePrevMonth}><FontAwesomeIcon icon={faArrowLeft} /></button>  
                <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                {/* used to convert a Date object to a string, representing the date and time according to the locale-specific 
                conventions (language and region) of the environment in which the code is running. */}
                <button onClick={handleNextMonth}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className="calendarGrid">
                {Array.from({ length: 42 }).map((_, index) => {
                    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1 - selectedDate.getDay());
                    const classNames = currentDate.getMonth() === selectedDate.getMonth() ? 'calendarDay' : 'calendarDay otherMonth';
                    const eventsForDate = getEventsForDate(currentDate);
                    return (
                        <div
                            key={currentDate.toISOString()}  //CHECK BELOW NOTES V IMPORTANT
                            className={classNames}
                            onMouseEnter={() => setHoveredDate(currentDate)}
                            onMouseLeave={() => setHoveredDate(null)}
                        >
                            <span>{currentDate.getDate()}</span>
                            {/* hoveredDate.getTime(): retrieves the time value (in milliseconds since January 1, 1970) of the hoveredDate.
                                currentDate.getTime(): This retrieves the time value of the currentDate being rendered in the calendar grid. 
                                
                                The getDate() method, on the other hand, returns the day of the month (1-31) for the Date object. 
                                It doesn't provide information about the entire date and time, only the day of the month.*/}
                            {hoveredDate && hoveredDate.getTime() === currentDate.getTime() && (
                                <div className="eventPopup">
                                    {eventsForDate.map(event => (
                                        <div className="eachEvent" key={event._id}>
                                            <p><strong>{formatDate(event.date)}</strong></p>
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




// Array Generation: 
// Array.from({ length: 42 }) creates an array with a length of 42. 
// This array is then used to generate elements for the calendar grid.

// Mapping Over the Array: 
// .map((_, index) => { ... }) iterates over each element of the array. 
// The underscore _ is used as a placeholder for the current element, which is not used in this case. 
// index represents the index of each element in the array.

// Creating Dates: 
// Inside the map function, a new currentDate is created for each element of the array. 
// It calculates the date based on ======================================================= VVV IMPORTANT
// the selectedDate (which represents the currently selected month) 
// and 
// the index of the array element. 
// This allows the calendar grid to display dates for the current month and adjacent months.

// CSS Class Determination: 
// classNames determines the CSS class to apply to each calendar day 
//based on whether the currentDate belongs to the selected month or a different month.

// Event Retrieval: 
// eventsForDate retrieves events associated with the currentDate using the getEventsForDate function (amra banaisilam)





// about key = ISOdate..

// Issue:
// Using the array index (index) as the key for elements rendered in a React component can lead to issues 
// when the order of elements in the array changes. 
// This is because React uses keys to identify elements uniquely and optimize rendering performance.
// If the order of elements changes in the array, React may mistakenly assume that elements have been added or removed, 
// resulting in unnecessary re-renders or inconsistencies in the UI.


// Solution: 
// replaced the key for the outer div in the Array.from map function 
// with a unique identifier generated from the current date (currentDate.toISOString())