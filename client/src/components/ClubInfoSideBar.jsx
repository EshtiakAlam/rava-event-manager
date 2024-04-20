import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClubInfoSideBar = ({clubData}) => {
    console.log(`Sidebar e ashlam`);
    console.log(`Side bar info:`, clubData);
    console.log(`Kono fetch na kore trying`,clubData.events);

    // Filter events happening this month
    const today = new Date();
    const thisMonthEvents = clubData.events.filter(event => {
        console.log(`Type of event.approval:`, typeof event.approval);
        console.log(`Value of event.approval:`, event.approval);
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear() && event.approval === 1;
    });
    

    
    const [pendingMembers, setPendingMembers] = useState([]);
    const [acceptedMembers, setAcceptedMembers] = useState([]);

    useEffect(() => {
        const fetchPendingMembers = async () => {
            try {
                const response = await fetch(`/api/club-members/pending-by-club/${clubData._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pending members');
                }
                const data = await response.json();
                setPendingMembers(data);
            } catch (error) {
                console.error('Error fetching pending members:', error.message);
            }
        };

        const fetchAcceptedMembers = async () => {
            try {
                const response = await fetch(`/api/club-members/approved-by-club/${clubData._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch accepted members');
                }
                const data = await response.json();
                setAcceptedMembers(data);
            } catch (error) {
                console.error('Error fetching accepted members:', error.message);
            }
        };

        if (clubData) {
            fetchPendingMembers();
            fetchAcceptedMembers();
        }
    }, [clubData]);

    console.log(`Side bar e all events:`, clubData.events);

    return ( 
        <div className="ClubInfoSideBar">
            <div className="Update">
                <Link to={`/club/edit/${clubData._id}`} className="ClubUpdateButton">
                    <p>Update Club Info</p>
                </Link>
            </div>
            <h1 className="extra"><span className="special-letter">HIGHLIGHTS</span></h1>
            <div className="UpcomingEvents">
                <h1>Upcoming Events</h1>
                <div className="event-container">
                    {thisMonthEvents.length === 0 ? (
                        <p className="no-events-message">You have 0 upcoming events this month</p>
                    ) : (
                        thisMonthEvents.map((event, index) => (
                            <div key={index} className="DashboardInfo event">
                                <p><strong>{event.title}</strong></p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="PendingVolunteers">
                <h1>Pending Requests</h1>
                <div>
                    {/* Display length of pending members list */}
                    {pendingMembers.length === 0 ? (
                        <p>You have 0 pending volunteer requests</p>
                    ) : (
                        <h4>You have {pendingMembers.length} pending volunteer requests</h4>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default ClubInfoSideBar;