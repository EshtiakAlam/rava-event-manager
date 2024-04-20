import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDate from "../utils/FormatDate";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ClubCard = ({ club_info, events }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        if (events) {
            const currentDate = new Date();
            const filteredEvents = events.filter(event => new Date(event.date) > currentDate);
            setFilteredEvents(filteredEvents);
        }
    }, [events]);

    return (
        <div className='eachClub'>
            <div className='eachClub-upper'>
                <div className='eachClub-upper-left'>
                    <h1>{club_info.title} ({club_info.abbreviation})</h1>
                    <h4>- {club_info.description}</h4>
                </div>
                <div className='eachClub-upper-right'>
                    <Link to ={`/join-club/${club_info._id}`} className='JoinClubButton'>
                        <b>JOIN US </b>
                    </Link>
                </div>
            </div>
            <h2>Events Organized by {club_info.title}</h2>
            <div className="Info">
                <div className="InfoContent">
                    {filteredEvents.length === 0 ? (
                        <div className="NothingToShow">
                            No events to show
                        </div>
                    ) : (
                        filteredEvents.map((event, index) => (
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
                        ))
                    )}
                </div>
            </div>
            <h2>Contact us at: {club_info.contactInformation.email}</h2>
        </div>
    );
}

export default ClubCard;
