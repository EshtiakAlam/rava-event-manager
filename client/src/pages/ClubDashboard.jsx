import React, { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubInfo from '../components/ClubInfo';
import ClubDashboardHeader from '../components/ClubDashboardHeader';

const ClubDashboard = () => {
    const [clubData, setClubData] = useState(null);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch("/api/clubs");
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
        
    return ( 
        <div className="ClubDashboard">
            <ClubNavbarVertical showHomepageButton={false} />
            <div className='content'>
                <ClubDashboardHeader />
                {clubData && <ClubInfo clubData={clubData[0]} />}
            </div>
        </div>
    );
}

export default ClubDashboard;
