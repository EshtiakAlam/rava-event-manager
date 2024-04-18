import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const EventDeadline = ({ event }) => {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTimeRemaining(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timerID);
    }, []);

    function getTimeRemaining() {
        const eventDate = new Date(event.date);
        const oneDayBeforeEvent = eventDate.getTime() - (24 * 60 * 60 * 1000); // Subtract one day from event date
        const currentTime = new Date().getTime();
        const timeDifference = oneDayBeforeEvent - currentTime;

        if (timeDifference <= 0) {
            return 'Event has expired';
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    return (
        <div className="EventDeadline">
            {timeRemaining !== 'Event has expired' ? (
                <>
                    <h2>DEADLINE UNTIL REGISTRATION</h2>
                    <div className="timeGrid">
                        <div className="timeHeading">
                            <h1><strong>Days</strong></h1>
                            <h1>{timeRemaining.days}</h1>
                        </div>
                        <div className="timeHeading">
                            <h1><strong>Hours</strong></h1>
                            <h1>{timeRemaining.hours}</h1>
                        </div>
                        <div className="timeHeading">
                            <h1><strong>Minutes</strong></h1>
                            <h1>{timeRemaining.minutes}</h1>
                        </div>
                        <div className="timeHeading">
                            <h1><strong>Seconds</strong></h1>
                            <h1>{timeRemaining.seconds}</h1>
                        </div>
                    </div>
                    <div>
                        <Link to={`${event.link}`} className='RegisterEventButton'>
                            <b>REGISTER NOW</b>
                        </Link>
                    </div>
                </>
            ) : (
                <h2 className='failureText'>Event has expired</h2>
            )}
        </div>
    );
}

export default EventDeadline;
