import formatDate from "../utils/FormatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Import heart icon
import  { useState, useEffect } from 'react';


export const EventKeyInfo = ({ event }) => {
    const [interestCount, setInterestCount] = useState(Number(event.like));
    const [interestStatus, setInterestStatus] = useState(false);

    const handleClick = async () => {
        let updatedCount = interestCount;
        if (!interestStatus) {
            updatedCount += 1;
        } else {
            updatedCount -= 1;
        }
        setInterestCount(updatedCount);
        setInterestStatus(!interestStatus);

        // Update like count in the database
        try {
            const response = await fetch(`/api/events/${event._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ like: updatedCount })
            });
            if (!response.ok) {
                throw new Error('Failed to update like count');
            }
        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };

    console.log(`After update:`,event.like);

    return (
        <div className="EventKeyInfo">
            {/* Display heart icon with the number of likes */}
            <button className="Interested" onClick={handleClick}>
                <FontAwesomeIcon icon={faHeart} /> {interestCount} Likes
            </button>
            <p>Date</p>
            <p><strong>{ formatDate(event.date) }</strong></p>
            <p>Time</p>
            <p><strong>{ event.time }</strong></p>
            <p>Location</p>
            <p><strong>{ event.location }</strong></p>
            <p>Link</p>
            <div>
            <a href={ event.link } target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            </div>
        </div>
      );
}
 
export default EventKeyInfo;