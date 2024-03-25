import formatDate from "../utils/FormatDate";
import { useEventsContext } from "../hooks/useEventsContext";

export const AdminEventCard = ({ event }) => {
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

export default AdminEventCard;
