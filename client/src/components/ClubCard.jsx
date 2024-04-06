import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDate from "../utils/FormatDate";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUsers } from '@fortawesome/free-solid-svg-icons';

const ClubCard = ({club_info, events}) => {
    console.log(`Output in card:`, club_info);
    console.log(`Output in card:`, events);

    const [new_events, setEvents] = useState(null);

    // Function to fetch events by ID
    const fetchEventById = async (eventId) => {
        try {
            const response = await fetch(`/api/events/${eventId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event');
            }
            const eventData = await response.json();
            return eventData;
        } catch (error) {
            console.error('Error fetching event:', error.message);
            return null;
        }
    };

    // Fetch events for each ID in club_info.events array
    useEffect(() => {
        const fetchEventsForClub = async () => {
            const eventPromises = club_info.events.map(async (eventId) => {
                return fetchEventById(eventId);
            });
            const eventResults = await Promise.all(eventPromises);
            // Set the fetched events
            setEvents(eventResults.filter(event => event !== null));
        };
        fetchEventsForClub();
    }, [club_info.events]);

    console.log(`Fetch er por:`, new_events);

    return (
        <div className='eachClub'>
            <div className='eachClub-upper'>
                <div className='eachClub-upper-left'>
                    <h1>{club_info.title} ({club_info.abbreviation})</h1>
                    <h4>- {club_info.description}</h4>
                </div>
                <div className='eachClub-upper-right'>
                    <Link to="/join-club" className='JoinClubButton'>
                        <b>JOIN US</b>
                    </Link>
                </div>
            </div>
            <h2>Events Organized by {club_info.title}</h2>
            <div className="Info">
                <div className="InfoContent">
                    {new_events && new_events.map((event, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ContentPart">
                                <h3><strong>{event.title}</strong></h3>
                                <div className="ContentPartSplit"> 
                                    <p><b><span className="special-letter">Date:</span> { formatDate(event.date) }</b></p>
                                    <Link to={`/events/${event._id}`} className="EventLinkButton">
                                        <FontAwesomeIcon icon={ faEye } size= "2x" />
                                        <span className="ViewEventText">View Event</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Contact us at: {club_info.contactInformation}</h2>
        </div>
    );
}

export default ClubCard;





// Promise: 
// A promise represents the eventual completion or failure of an asynchronous operation and its resulting value. 
// When you call an asynchronous function, it returns a promise immediately, which may be pending, fulfilled with a value, or rejected with an error. 
// In this case, fetchEventById returns a promise 
// that resolves with the event data when the data is fetched successfully.

// Promise.all: 
// The map function returns an array of promises, each representing a fetch operation for an event. 
// Promise.all takes an array of promises and returns a single promise 
// that resolves when all of the promises in the array have resolved or rejects if any of the promises reject. 
// This ensures that all events are fetched concurrently.

// Setting Fetched Events: 
// Once all events are fetched (eventResults), 
// the code filters out any null values (which might occur if there's an error fetching an event)
// Then, it sets the fetched events using the setEvents function, updating the component's state.

// Dependency Array: 
// The useEffect hook has a dependency array [club_info.events], 
// the effect will re-run whenever the value of club_info.events changes. 
// This ensures that the events are re-fetched whenever the club_info.events data changes.



// Hooks basically make it easier to write functional components in React, 
// giving them superpowers to manage data, handle updates, and do other useful things. 