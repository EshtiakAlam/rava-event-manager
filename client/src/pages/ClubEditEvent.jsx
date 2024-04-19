import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubDashBoardHeader from '../components/ClubDashboardHeader';

const ClubEditEvent = () => {
    const { _id } = useParams(); // Extract _id from URL parameters
    const [eventData, setEventData] = useState(null);
    const [editedEventData, setEditedEventData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [clubData, setClubData] = useState(null);
    const [clubId, setClubId] = useState(null);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch("/api/clubs/");
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
    }, []);

    useEffect(() => {
        if (clubData && eventData) {
            const filterClub = clubData.filter(club => club.title === eventData.organizer);
            if (filterClub.length > 0) {
                setClubId(filterClub[0]._id);
            }
        }
    }, [clubData, eventData]);

    console.log(`All events info:`, clubData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/events/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedEventData),
            });
            if (!response.ok) {
                throw new Error('Failed to update event data');
            }
            // Update eventData state with editedEventData
            setEventData(editedEventData);
            setSuccess('Event data updated successfully!');
            setError(null);
        } catch (error) {
            console.error('Error updating event data:', error.message);
            setError(error.message);
            setSuccess(null);
        }
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/api/events/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setEventData(eventData);
                setEditedEventData({ ...eventData }); // Initialize editedEventData with event data
            } catch (error) {
                console.error('Error fetching event data:', error.message);
            }
        };

        fetchEventData();
    }, [_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEventData({
            ...editedEventData,
            [name]: value,
        });
    };

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

    const handleHighlightChange = (e, index) => {
        const newHighlights = [...editedEventData.highlights];
        newHighlights[index] = e.target.value;
        setEditedEventData({ ...editedEventData, highlights: newHighlights });
    };

    const handleAddHighlight = () => {
        const newHighlights = [...editedEventData.highlights, ''];
        setEditedEventData({ ...editedEventData, highlights: newHighlights });
    };

    const handleRemoveHighlight = (index) => {
        const newHighlights = [...editedEventData.highlights];
        newHighlights.splice(index, 1);
        setEditedEventData({ ...editedEventData, highlights: newHighlights });
    };

    const handleFAQChange = (e, index, field) => {
        const newFAQ = [...editedEventData.FAQ];
        newFAQ[index][field] = e.target.value;
        setEditedEventData({ ...editedEventData, FAQ: newFAQ });
    };

    const handleAddFAQ = () => {
        const newFAQ = [...editedEventData.FAQ, { question: '', answer: '' }];
        setEditedEventData({ ...editedEventData, FAQ: newFAQ });
    };

    const handleRemoveFAQ = (index) => {
        const newFAQ = [...editedEventData.FAQ];
        newFAQ.splice(index, 1);
        setEditedEventData({ ...editedEventData, FAQ: newFAQ });
    };

    console.log(`Event date:`, eventData);

    return (
        <div className="ClubEditEvent">
            <ClubNavbarVertical clubId={clubId} showHomepageButton={true} />
            <ClubDashBoardHeader />

            <h1 className='extra'><span className='special-letter'>E</span>dit Event</h1>

            <div className="edit-form-wrapper">
                {eventData && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Event Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editedEventData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="tagline">Tagline:</label>
                            <input
                                type="text"
                                id="tagline"
                                name="tagline"
                                value={editedEventData.tagline}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="organizer">Organizer:</label>
                            <input
                                type="text"
                                id="organizer"
                                name="organizer"
                                value={editedEventData.organizer}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={editedEventData.date ? editedEventData.date.slice(0, 10) : ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={editedEventData.time ? editedEventData.time : ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={editedEventData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="link">Facebook link:</label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={editedEventData.link}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={editedEventData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Highlights:</label>
                            {editedEventData.highlights.map((highlight, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={highlight}
                                        onChange={(e) => handleHighlightChange(e, index)}
                                    />
                                    <div className='Keys'>
                                        <button type="button" onClick={() => handleRemoveHighlight(index)}>Remove</button>
                                        <button type="button" onClick={handleAddHighlight}>Add Highlight</button>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                        <div>
                            <label>FAQ:</label>
                            {editedEventData.FAQ.map((faq, index) => (
                                <div key={index}>
                                    <label>Question:</label>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => handleFAQChange(e, index, 'question')}
                                    />
                                    <label>Answer:</label>
                                    <input
                                        type="text"
                                        value={faq.answer}
                                        onChange={(e) => handleFAQChange(e, index, 'answer')}
                                    />
                                <div className='Keys'>
                                    <button type="button" onClick={() => handleRemoveFAQ(index)}>Remove</button>
                                    <button type="button" onClick={handleAddFAQ}>Add FAQ</button>
                                </div>
                                </div>
                            ))}
                            
                        </div>
                        {error && <p className="error-message">Error: {error}</p>}
                        {success && <p className="success-message">Event data updated successfully!</p>}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>

        </div>
    );
};

export default ClubEditEvent;
