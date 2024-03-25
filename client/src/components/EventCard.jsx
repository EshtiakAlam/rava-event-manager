<<<<<<< HEAD
import formatDate from "../utils/FormatDate";
import { useEventsContext } from "../hooks/useEventsContext";

export const EventCard = ({ event }) => {
    const { dispatch } = useEventsContext();

    const handleClick = async () => {
        try {
            const response = await fetch(`/api/events/${event._id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete event");
            }

            dispatch({ type: "DELETE_EVENT", payload: { _id: event._id } });
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="event-card">
            <h4>{event.title}</h4>
            <p><strong>by: {event.organizer}</strong></p>
            <p><strong>Date: {formatDate(event.date)}</strong></p>
            <p><strong>Location: {event.location} Time:{event.location}  </strong></p>
            <button onClick={handleClick}>Delete</button>
        </div>
    );
};
=======
// import formatDate from "../utils/FormatDate";
import EventPicture from "./EventPicture";
import {EventKeyInfo} from "../components/EventKeyInfo";
import {EventIncludes} from "../components/EventIncludes";
import {EventAboutandFAQ} from "../components/EventAboutandFAQ";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export const EventCard = ({ event }) => {
    console.log(event);
    // let tag_line = "Welcoming young bloods into the mayhem";    /*FETCH FROM EVENTS*/

    return (
                <div className="event-card">
                    <EventPicture />
                    <div className="EventCardLayer1">
                        <div className="EventCardLayer1Left">
                            <div className="EventCardLayer1Left1">
                                <h1><FontAwesomeIcon icon={faTicketAlt} />{event.title}</h1>
                                <h4>{event.tagline}</h4>
                                <h3><strong> <FontAwesomeIcon icon={faUsers} /> {event.organizer}</strong></h3>
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
>>>>>>> origin/shafi_events_working_5.0

export default EventCard;
