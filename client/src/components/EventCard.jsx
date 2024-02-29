import formatDate from "../utils/FormatDate";

export const EventCard = ({ event }) => {
    return (
                <div className="event-card">
                    <h4>{event.title}</h4>
                    <p><strong>by: {event.organizer}</strong></p>
                    <p><strong>Date: {formatDate(event.date)}</strong></p>
                </div>
            )
}

export default EventCard;
