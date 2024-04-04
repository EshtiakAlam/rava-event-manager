import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
                    <Link to="/clubs/club/join-club" className='JoinClubButton'>
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
                                    <p><b><span className="special-letter">Date:</span> {event.tagline}</b></p>
                                    <Link to={`/events/${event._id}`} className="EventLinkButton">
                                        View Event
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
