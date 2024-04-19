import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClubInfoSideBar = ({clubData}) => {
    console.log(`Sidebar e ashlam`);
    console.log(`Side bar info:`, clubData);

    //Pore eta hobe clubData.members
    const members = [
        { 'name': "Shamsur Shafi", "status": "Panelist", 'studentId': '001', 'email': "m.s.shafi@g.bracu.ac.bd", 'department': "CSE", 'joinDate': '2020-04-15T00:00:00.000Z' },
        { 'name': "Eshtiak Shihab", "status": "Panelist", 'studentId': '002', 'email': "shihabi@g.bracu.ac.bd", 'department': "EEE", 'joinDate': '2021-06-15T00:00:00.000Z' },
        { 'name': "Karim Benz", "status": "Panelist", 'studentId': '003', 'email': "karim.israr@g.bracu.ac.bd", 'department': "EEE" , 'joinDate': '2019-08-19T00:00:00.000Z' },
        { 'name': "Maruf", "status": "Panelist", 'studentId': '004', 'email': "maruf@g.bracu.ac.bd", 'department': "ANT" , 'joinDate': '2020-12-02T00:00:00.000Z'},
        { 'name': "Anurag Sikder", "status": "Member", 'studentId': '005', 'email': "anurag@g.bracu.ac.bd", 'department': "ECO"  , 'joinDate': '2023-04-15T00:00:00.000Z'},
        { 'name': "Haseen", "status": "None", 'studentId': '010', 'email': "haseen@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2023-03-13T00:00:00.000Z'},
        { 'name': "Nuzhat Rahman", "status": "Member", 'studentId': '006', 'email': "catto@g.bracu.ac.bd", 'department': "ANT" , 'joinDate': '2023-01-10T00:00:00.000Z'},
        { 'name': "Nuhash Neeha", "status": "Member", 'studentId': '007', 'email': "kobir.bhai@g.bracu.ac.bd", 'department': "CS" , 'joinDate': '2024-01-01T00:00:00.000Z'},
        { 'name': "Raki", "status": "Member", 'studentId': '008', 'email': "original.shafee.shamsur.shafi.nureaziz@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2024-03-13T00:00:00.000Z'},
        { 'name': "Imtela Islam", "status": "Member", 'studentId': '009', 'email': "married.hu@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2019-09-22T00:00:00.000Z' },
        { 'name': "Maliha Sejutee", "status": "None", 'studentId': '012', 'email': "sejutee@g.bracu.ac.bd", 'department': "MIC" , 'joinDate': '2024-03-13T00:00:00.000Z'},
    ]

    // const [eventsData, setEventsData] = useState([]);

    // useEffect(() => {
    //     const fetchEventData = async () => {
    //         try {
    //             const response = await fetch('/api/events/approved');
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch events data');
    //             }
    //             const eventData = await response.json();
    //             setEventsData(eventData);
    //         } catch (error) {
    //             console.error('Error fetching events data:', error.message);
    //         }
    //     };

    //     fetchEventData();
    // }, []);

    // const clubTitle = clubData ? clubData.title : null;
    // const filteredEvents = clubData ? eventsData.filter(event => event.organizer === clubTitle && event.approval === true) : [];

    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchEventDataById = async (eventId) => {
            try {
                const response = await fetch(`/api/events/${eventId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch event with ID ${eventId}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Error fetching event with ID ${eventId}:`, error.message);
                return null;
            }
        };

        if (clubData.events) {
            const fetchEvents = async () => {
                const eventPromises = clubData.events.map(eventId => fetchEventDataById(eventId));
                const events = await Promise.all(eventPromises);
                const filteredEvents = events.filter(event => event !== null);
                setFilteredEvents(filteredEvents);
            };

            fetchEvents();
        }
    }, [clubData.events]);

    // Filter events happening this month
    const today = new Date();
    const thisMonthEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear() && event.approval == 1;
    });

    // Filter members with status = None
    const pendingMembers = members.filter(member => member.status === 'None');

    console.log(`Side bar e all events:`, clubData.events);
    console.log(`final list:`, filteredEvents);

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