import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubDashBoardHeader from '../components/ClubDashboardHeader';
import AdminNavbarVertical from '../components/AdminNavbarVertical';
import AdminDashBoardHeader from '../components/AdminDashboardHeader';

const AdminViewEvent = () => {
    const { _id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/api/events/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setEventData(eventData);
            } catch (error) {
                console.error('Error fetching event data:', error.message);
                setError('Failed to fetch event data');
            }
        };

        fetchEventData();
    }, [_id]);

    const handleApprove = async () => {
        try {
            const response = await fetch(`/api/events/${_id}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approval: true }),
            });
            if (!response.ok) {
                throw new Error('Failed to approve event');
            }
            setSuccess('Event approved successfully!');
        } catch (error) {
            console.error('Error approving event:', error.message);
            setError('Failed to approve event');
        }
    };

    const handleRevertDecision = async () => {
        try {
            const newApproval = !eventData.approval;
            const response = await fetch(`/api/events/${_id}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approval: newApproval }),
            });
            if (!response.ok) {
                throw new Error('Failed to revert decision');
            }
            setSuccess('Decision reverted successfully!');
        } catch (error) {
            console.error('Error reverting decision:', error.message);
            setError('Failed to revert decision');
        }
    };

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
        <div className="ClubEditEvent">
            <AdminNavbarVertical showHomepageButton={true} />
            <AdminDashBoardHeader />

            <h1 className='extra'><span className='special-letter'>V</span>iew Event</h1>

            <div className="edit-form-wrapper" style={{textAlign: 'center'}}>
                {eventData && (
                    <form>
                        <div>
                            <label htmlFor="title">Event Title:</label>
                            <p>{eventData.title}</p>
                        </div>
                        <div>
                            <label htmlFor="tagline">Tagline:</label>
                            <p>{eventData.tagline}</p>
                        </div>
                        <div>
                            <label htmlFor="organizer">Organizer:</label>
                            <p>{eventData.organizer}</p>
                        </div>
                        <div>
                            <label htmlFor="date">Date:</label>
                            <p>{eventData.date}</p>
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <p>{eventData.time}</p>
                        </div>
                        <div>
                            <label htmlFor="location">Location:</label>
                            <p>{eventData.location}</p>
                        </div>
                        <div>
                            <label htmlFor="link">Facebook link:</label>
                            <p>{eventData.link}</p>
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <p>{eventData.description}</p>
                        </div>

                        <div>
                            <label>Highlights:</label>
                            {eventData.highlights && eventData.highlights.map((highlight, index) => (
                                <div key={index}>
                                    <p>{highlight}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label>FAQ:</label>
                            {eventData.FAQ && eventData.FAQ.map((faq, index) => (
                                <div key={index}>
                                    <label>Question:</label>
                                    <p>{faq.question}</p>
                                    <label>Answer:</label>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                        {eventData.approval === 1 || eventData.approval === 0 ? (
                            // If event is approved or not approved, show current decision
                            <div>
                                <p className='CurrentDecisionAdminEvent'>Current Decision: {eventData.approval ? 'Approved' : 'Not Approved'}</p>
                                <button className='CurrentDecisionAdminEvent' onClick={() => handleRevertDecision(eventData._id)}>Revert Decision</button>
                            </div>
                        ) : (
                            // If event is pending, show buttons to approve or not approve
                            <div>
                                <div>
                                    <button className='CurrentDecisionAdminEvent' onClick={handleApprove}>Approve</button>
                                </div>
                                <div>
                                    <button className='CurrentDecisionAdminEvent' onClick={handleRevertDecision}>Not Approve</button>
                                </div>
                            </div>
                        )}
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminViewEvent;
