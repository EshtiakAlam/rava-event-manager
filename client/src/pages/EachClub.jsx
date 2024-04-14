import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import ClubCard from '../components/ClubCard';

const EachClub = () => {
    const { _id } = useParams(); // Extract club ID from URL parameters
    const [clubInfo, setClubInfo] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.classList.add('body-club');
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        return () => {
            document.body.classList.remove('body-club');
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
        };
    }, []);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const response = await fetch(`/api/clubs/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club details');
                }
                const clubData = await response.json();

                if (!clubData || Object.keys(clubData).length === 0) {
                    throw new Error('Received unexpected club data format');
                }

                //In Js, the Object.keys() method is used to extract the keys (property names) of an object and return them as an array.


                setClubInfo(clubData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching club details:', error.message);
                setError('Error fetching club details. Please try again later.');
                setLoading(false);
            }
        };

        const fetchEventData = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events data');
                }
                const eventData = await response.json();
                setEventsData(eventData);
            } catch (error) {
                console.error('Error fetching events data:', error.message);
            }
        };

        fetchClubDetails();
        fetchEventData();
    }, [_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!clubInfo) {
        return <div>No club data available</div>;
    }

    console.log(`Pore 1`, clubInfo);
    console.log(`Pore 2`, eventsData);

    console.log(`Now we fetch actual events:`);
 
    const events = clubInfo ? eventsData.filter(event => event.organizer === clubInfo.title) : [];

    console.log(`AFter filter:`, events);



    return (
        <div>
            <div className="events">
                <ClubCard club_info={clubInfo} events={events} />
            </div>
        </div>
    )
}

export default EachClub;
