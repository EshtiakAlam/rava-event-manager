import formatDate from "../utils/FormatDate";
import EventPicture from "./EventPicture";
import {EventKeyInfo} from "../components/EventKeyInfo";
import {EventIncludes} from "../components/EventIncludes";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export const EventCard = ({ event }) => {
    console.log(event);
    let tag_line = "Welcoming young bloods into the mayhem";    /*FETCH FROM EVENTS*/

    return (
                <div className="event-card">
                    <EventPicture />
                    <div className="EventCardLayer1">
                        <div className="EventCardLayer1Left">
                            <div className="EventCardLayer1Left1">
                                <h1>{event.title}</h1>
                                <h4>{ tag_line }</h4>
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
                </div>
            )
}

export default EventCard;
