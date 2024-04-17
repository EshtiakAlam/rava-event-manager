import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbarVertical from '../components/AdminNavbarVertical';
import AdminDashBoardHeader from '../components/AdminDashboardHeader';

const AdminLogistics = () => {
    const [clubsData, setClubsData] = useState([]);
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const fetchClubsData = async () => {
            try {
                const response = await fetch(`/api/clubs/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch clubs data');
                }
                const clubsData = await response.json();
                setClubsData(clubsData);
            } catch (error) {
                console.error('Error fetching clubs data:', error.message);
            }
        };

        fetchClubsData();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const allEvents = [];
    
            await Promise.all(clubsData.map(async (club) => {
                await Promise.all(club.events.map(async (eventId) => {
                    try {
                        const response = await fetch(`/api/events/${eventId}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch event with ID ${eventId}`);
                        }
                        const event = await response.json();
                        if (event.approval === 1 && event.logistics) {
                            event.logistics.forEach((logistic) => {
                                if (logistic.item !== 'none') {
                                    const logisticsData = { eventId: event._id, eventName: event.title, clubName: event.organizer, ...logistic };
                                    allEvents.push(logisticsData);
                                }
                            });
                        }
                    } catch (error) {
                        console.error(`Error fetching event with ID ${eventId}:`, error.message);
                    }
                }));
            }));
    
            console.log(`Shob events ek jaegae: `, allEvents);
            setEventsData(allEvents);
        };
    
        fetchEvents();
    }, [clubsData]);

    const pendingLogistics = eventsData.filter((logistic) => logistic.approved === 'none');
    const approvedLogistics = eventsData.filter((logistic) => logistic.approved !== 'none');

    useEffect(() => {
        // Remove the Navbar component from the DOM when ClubDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        const bottomBarElement = document.querySelector('.BottomBar');
        if (bottomBarElement) {
            bottomBarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when ClubDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
                bottomBarElement.style.display = 'block';
            }
        };
    }, []);

    return (
        <div className="ClubLogistics">
            <AdminNavbarVertical showHomepageButton={true} />
            <AdminDashBoardHeader />

            <h1 className="extra"><span className="special-letter">S</span>ummary</h1>
            <div className="summary-grid">
                {approvedLogistics.length === 0 ? (
                    <h1 className='Nobody'>No logistic requests to report</h1>
                ) : (
                    <div className="headers">
                        <div className="header-1">
                            <h1>Club Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index}><strong>{logistic.clubName}</strong></p>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Event Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index}><strong>{logistic.eventName}</strong></p>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Item Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index}>
                                    <Link to={`/admin/editLogistic/${logistic.item}/${logistic.eventId}`}><strong>{logistic.item}</strong></Link>
                                </p>
                            ))}
                        </div>
                        <div className="header-4">
                            <h1>Status</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index} className={logistic.approved === 'true' ? 'approved' : 'rejected'}>
                                    <strong>{logistic.approved === 'true' ? 'Approved' : 'Rejected'}</strong>
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <h1 className="extra"><span className="special-letter">P</span>ending Requests</h1>
            <div className="pending-grid">
                {pendingLogistics.length === 0 ? (
                    <h1 className='Nobody'>No logistic requests to report</h1>
                ) : (
                    <div className="headers2">
                        <div className="header-1">
                            <h1>Club Name</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <p key={index}><strong>{logistic.clubName}</strong></p>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Event Name</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <p key={index}><strong>{logistic.eventName}</strong></p>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Item Name</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <p key={index}>
                                    <Link to={`/admin/editLogistic/${logistic.item}/${logistic.eventId}`}><strong>{logistic.item}</strong></Link>
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Link to={`/admin/addLogistics/`} className='AddLogisticsButton'>
                    <b>ADD NEW LOGISTIC REQUEST</b>
                </Link>
            </div>
        </div>
    );
}

export default AdminLogistics;
