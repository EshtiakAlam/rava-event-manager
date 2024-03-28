import formatDate from "../utils/FormatDate";
import { useEventsContext } from "../hooks/useEventsContext";
import { useAdminAuthContext } from "../hooks/useAdminAuthContext";
export const AdminEventCard = ({ event }) => {
    const { dispatch } = useEventsContext();
    const { admin } = useAdminAuthContext();
    const handleClick = async () => {
        
        try {
            const response = await fetch(`/api/events/${event._id}`, {
                method: "DELETE",
                headers: {
                    
                    Authorization: `Bearer ${admin.token}`,
                  },
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
            <a href="/admin/events">_</a>
        </div>
    );
};

export default AdminEventCard;
