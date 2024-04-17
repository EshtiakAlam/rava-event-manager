import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useEventsContext } from '../hooks/useEventsContext';
import formatDate from '../utils/FormatDate';
import AdminDashBoardHeader from '../components/AdminDashboardHeader';
import AdminNavbarVertical from '../components/AdminNavbarVertical';

const AdminEvent = () => {
    const { events, dispatch } = useEventsContext();
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/");
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: "SET_EVENTS", payload: json });
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [dispatch]);

    useEffect(() => {
        // Remove the Navbar component from the DOM when AdminDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        const bottomBarElement = document.querySelector('.BottomBar');
        if (bottomBarElement) {
            bottomBarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when AdminDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
                bottomBarElement.style.display = 'block';
            }
        };
    }, []);

    const approvedEvents = events ? events.filter(event => event.approval === 1 || event.approval === 0) : [];
    const pendingEvents = events ? events.filter(event => event.approval !== 1) : [];


    return (
        <div className="AdminEvents">
            <AdminNavbarVertical />
            <AdminDashBoardHeader />

            {events && (
                <>
                    <h1 className='extra'>Upcoming <span className='special-letter'>E</span>vents</h1>
    
                    <div className="headers">
                        <div className="header-left">
                            <h1 className='top'>Club Name</h1>
                        </div>
                        <div className="header-left">
                            <h1 className='top'>Event Name</h1>
                        </div>
                        <div className="header-mid">
                            <h1 className='top'>Event Date</h1>
                        </div>
                        <div className="header-right">
                            <h1 className='top'>Decision Status</h1>
                        </div>
                    </div>
    
                    {approvedEvents.map((event, index) => (
                        <div className="info" key={index}>
                            <div className="info-left">
                                <h3>{event.organizer}</h3>
                            </div>
                            <div className="info-left">
                                <Link to={`/admin/event/${event._id}`} className="event-link">
                                    <h3>{event.title}</h3>
                                </Link>
                            </div>
                            <div className="info-mid">
                                <h3>{formatDate(event.date)}</h3>
                            </div>
                            <div className="info-right">
                                <h3>{event.approval ? <p1>Approved</p1> : <p2>Not Approved</p2>}</h3>
                            </div>
                        </div>
                    ))}

                <h1 className='extra'>Pending <span className='special-letter'>E</span>vents</h1>
                    
                    <div className="headers">
                        <div className="header-left">
                            <h1 className='top'>Club Name</h1>
                        </div>
                        <div className="header-left">
                            <h1 className='top'>Event Name</h1>
                        </div>
                        <div className="header-mid">
                            <h1 className='top'>Event Date</h1>
                        </div>
                        <div className="header-right">
                            <h1 className='top'>Decision Status</h1>
                        </div>
                    </div>

                    {pendingEvents.map((event, index) => (
                        <div className="info" key={index}>
                            <div className="info-left">
                                <h3>{event.organizer}</h3>
                            </div>
                            <div className="info-left">
                                <Link to={`/admin/event/${event._id}`} className="event-link">
                                    <h3>{event.title}</h3>
                                </Link>
                            </div>
                            <div className="info-mid">
                                <h3>{formatDate(event.date)}</h3>
                            </div>
                            <div className="info-right">
                                <h3>Pending</h3>
                            </div>
                        </div>
                    ))}
                
    
                    <div className='clubAddEvent'>
                        <Link to={`/admin/addEvent/`} className='ClubAddEvent'>
                            <b>CREATE NEW EVENT</b>
                        </Link>
                    </div>
                </>
            )}

        </div>
    );
};

export default AdminEvent;
