import React, { useState, useEffect } from 'react';
import formatDate from "../utils/FormatDate"; 
import ClubDashBoardHeader from '../components/ClubDashboardHeader';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import { Link, useParams } from 'react-router-dom';

export const ShowClubEvents = () => {
    const { _id } = useParams();
    const clubId = _id;

    const [clubData, setClubData] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch(`/api/clubs/${clubId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const json = await response.json();
                setClubData(json);
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        fetchClubData();
    }, [clubId]);

    useEffect(() => {
        // Fetch event data only if clubData exists and has been fetched
        if (clubData && clubData.events) {
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

            const fetchEvents = async () => {
                const eventPromises = clubData.events.map(eventId => fetchEventDataById(eventId));
                const events = await Promise.all(eventPromises);
                const filteredEvents = events.filter(event => event !== null);
                setFilteredEvents(filteredEvents);
            };

            fetchEvents();
        }
    }, [clubData]);

    useEffect(() => {
        // Remove the Navbar component from the DOM when ClubDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when ClubDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
            }
        };
    }, []);

    const approvedEvents = filteredEvents.filter(event => event.approval === 1 || event.approval === 0);
    const pendingEvents = filteredEvents.filter(event => event.approval !== 1);


    console.log(`Ei club er events:`, filteredEvents);
    console.log("Approved Events:", approvedEvents);
    console.log("Pending Events:", pendingEvents);
    console.log(`Ekhon ShowClubEvents e asi`);


    const handleDeleteEvent = async (eventId) => {
        try {
            // Send a DELETE request to the backend API to delete the event
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete event with ID ${eventId}`);
            }
            // If deletion was successful, update the clubData.events array in the state
            const updatedEvents = clubData.events.filter(id => id !== eventId);
            setClubData({ ...clubData, events: updatedEvents });
        } catch (error) {
            console.error('Error deleting event:', error.message);
        }
    };



    return (
        <div className="ShowClubEvents">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />
            {clubData && clubData.events && (
                <>
                    <h1 className='extra'>Upcoming <span className='special-letter'>{clubData.abbreviation}</span> Events</h1>
    
                    <div className="headers">
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
                                <h3>{event.title}</h3>
                            </div>
                            <div className="info-mid">
                                <h3>{formatDate(event.date)}</h3>
                            </div>
                            <div className="info-right">
                                <h3>{event.approval ? <p1>Approved</p1> : <p2>Not Approved</p2>}</h3>
                            </div>
                        </div>
                    ))}



                <h1 className='extra'>Pending <span className='special-letter'>{clubData.abbreviation}</span> Events</h1>
                    
                    <div className="headers">
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
                                <h3>{event.title}</h3>
                            </div>
                            <div className="info-mid">
                                <h3>{formatDate(event.date)}</h3>
                            </div>
                            <div className="info-right">
                                <h3>Pending</h3>
                            </div>
                        </div>
                    ))}
                

                    <h2 className='extra2'>Events Created</h2>
                    <div className="Info">
                        <div className="InfoContent">
                            {filteredEvents.map((event, index) => (
                                <div className="EachInfo" key={index}>
                                    <div className="ContentPart">
                                        <h3><strong>{event.title}</strong></h3>
                                        <div className="ContentPartSplit">
                                            <p><b><span className="special-letter">Date: </span>{formatDate(event.date)}</b></p>
                                            <div className='event-links'>
    
                                                <Link to={`/club/edit/event/${event._id}`} className="EventLinkButton">
                                                    <p>Edit Event</p>
                                                </Link>

                                                <button className='DeleteEventByClub' onClick={() => handleDeleteEvent(event._id)}>Delete Event</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <div className='clubAddEvent'>
                        <Link to={`/club/showclubevents/addEvent/${_id}`} className='ClubAddEvent'>
                            <b>CREATE NEW EVENT</b>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );    
}

export default ShowClubEvents;
