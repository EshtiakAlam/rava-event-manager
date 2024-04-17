import { Link, useParams } from "react-router-dom";
import ClubNavbarVertical from "../components/ClubNavbarVertical";
import ClubDashBoardHeader from "../components/ClubDashboardHeader";
import { useEffect, useState } from "react";
import React from "react";

const ClubLogistics = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [pendingLogistics, setPendingLogistics] = useState([]);
    const [approvedLogistics, setApprovedLogistics] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const clubId = _id;

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
                    const eventData = await response.json();
                    // If eventData is empty or null, return null
                    if (!eventData || Object.keys(eventData).length === 0) {
                        return null;
                    }
                    return eventData;
                } catch (error) {
                    console.error(`Error fetching event with ID ${eventId}:`, error.message);
                    return null;
                }
            };
    
            const fetchEvents = async () => {
                const eventPromises = clubData.events.map(eventId => fetchEventDataById(eventId));
                const events = await Promise.all(eventPromises);
                // Filter out null or empty responses
                const filteredEvents = events.filter(event => event !== null);
                setFilteredEvents(filteredEvents);
            };
    
            fetchEvents();
        }
    }, [clubData]);
    


    console.log(`Filtered e ase:`, filteredEvents);


    useEffect(() => {
        // Remove the Navbar component from the DOM when AdminEventForm mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when AdminEventForm unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
            }
        };
    }, []);

    useEffect(() => {
        console.log(`Shuru of process e asi`);
    
        if (clubData && clubData.title && filteredEvents.length) {
            const clubTitle = clubData.title;
            const allLogistics = [];
    
            filteredEvents.forEach(event => {
                if (event.organizer === clubTitle && event.approval === 1 && event.logistics) {
                    console.log(`Entering event:`);
                    console.log(`Data 1:`, event);
                    event.logistics.forEach(logistic => {
                        if (logistic.item !== 'none') {
                            console.log(`Loop e entering event logistic:`);
                            console.log(`Data 2`, logistic);
                            const logisticsData = { eventId: event._id, eventName: event.title, ...logistic };
                            allLogistics.push(logisticsData);
                            console.log(`Status is:`, logistic.approved, `of type`, typeof logistic.approved);
                        }
                    });
                }
            });

            console.log(`All Logistics`, allLogistics);
    
            const pending = allLogistics.filter(logistic => logistic.approved === 'none');
            const approved = allLogistics.filter(logistic => logistic.approved !== 'none');
    
            console.log('Pending:', pending);
            console.log('Approved:', approved);
    
            setPendingLogistics(pending);
            setApprovedLogistics(approved);
        }
    }, [clubData, filteredEvents]);
    
    

    return (
        <div className="ClubLogistics">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />



            <h1 className="extra"><span className="special-letter">S</span>ummary</h1>

            <div className="summary-grid">
            {approvedLogistics.length === 0 ? (
                <h1 className='Nobody'>No logistic requests to report</h1>
            ) : (
                <div className="headers">
                    <div className="header-1">
                        <h1>Event Name</h1>
                        {approvedLogistics.map((logistic, index) => (
                            <p key={index}><strong>{logistic.eventName}</strong></p>
                        ))}
                    </div>
                    <div className="header-2">
                        <h1>Item Name</h1>
                        {approvedLogistics.map((logistic, index) => (
                            <p key={index}>{logistic.item}</p>
                        ))}
                    </div>
                    <div className="header-3">
                        <h1>Quantity</h1>
                        {approvedLogistics.map((logistic, index) => (
                            <p key={index}>{logistic.quantity}</p>
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
                        <h1>Event Name</h1>
                        {pendingLogistics.map((logistic, index) => (
                            <p key={index}><strong>{logistic.eventName}</strong></p>
                        ))}
                    </div>
                    <div className="header-2">
                        <h1>Item Name</h1>
                        {pendingLogistics.map((logistic, index) => (
                            <p key={index}>{logistic.item}</p>
                        ))}
                    </div>
                    <div className="header-3">
                        <h1>Quantity</h1>
                        {pendingLogistics.map((logistic, index) => (
                            <p key={index}>{logistic.quantity}</p>
                        ))}
                    </div>
                </div>
            )}
            </div>
            <div>
                <Link to={`/club/addLogistics/${_id}`} className='AddLogisticsButton'>
                    <b>ADD NEW LOGISTIC REQUEST</b>
                </Link>
            </div>
        </div>
    );
}

export default ClubLogistics;
