// import formatDate from "../utils/FormatDate";
import EventPicture from "./EventPicture";
import {EventKeyInfo} from "../components/EventKeyInfo";
import {EventIncludes} from "../components/EventIncludes";
import {EventAboutandFAQ} from "../components/EventAboutandFAQ";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const EventCard = ({ event }) => {
    console.log(event);
    // let tag_line = "Welcoming young bloods into the mayhem";    /*FETCH FROM EVENTS*/

    const [clubs, setClubs] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            const response = await fetch("/api/clubs/");
            const json = await response.json();

            if (response.ok) {
                setClubs(json);
            }
        };

        fetchClubs();
    }, []);

    // Function to find the _id of the club based on the organizer's title
    const findClubId = () => {
        if (!clubs) return null;

        const matchingClub = clubs.find(club => club.title === event.organizer);
        return matchingClub ? matchingClub._id : null;
    };

    // Call the function to get the club _id
    const clubId = findClubId();

    console.log(clubs);

    return (
                <div className="event-card">
                    <EventPicture />
                    <div className="EventCardLayer1">
                        <div className="EventCardLayer1Left">
                            <div className="EventCardLayer1Left1">
                                <h1><span className="special-letter">{event.title[0]}</span>{event.title.substring(1)}</h1>
                                <h3>{event.tagline}</h3>
                                <Link to={`/allclubs/${clubId}`}>         

                                    <h3>
                                        <strong> 
                                            <FontAwesomeIcon icon={faUsers} /> {event.organizer}
                                        </strong>
                                    </h3>
                                </Link>
                            </div>
                            <div className="EventCardLayer1Left2">
                                <EventIncludes key={event._id} event ={event}/>
                            </div>
                        </div>
        
                        <div className="EventCardLayer1Right">
                            <EventKeyInfo key={event._id} event ={event}/>
                        </div>
                    </div>
                    <div className="EventCardLayer2">
                        <EventAboutandFAQ key={event._id} event ={event}/>
                    </div>
                </div>
            )
}

export default EventCard;
