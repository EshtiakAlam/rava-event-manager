import React, { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubInfo from '../components/ClubInfo';
import ClubDashboardHeader from '../components/ClubDashboardHeader';

const ClubDashboard = () => {
    const [clubData, setClubData] = useState(null);
    const clubId = localStorage.getItem('clubID'); 
    console.log("dashboard",clubId)

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

        if (clubId) {
            fetchClubData();
        }
    }, [clubId]); // Fetch data when clubId changes

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

    console.log(`Club data fetched:`, clubData);
    console.log(`Dashboard theke sending`);
        
    return ( 
        <div className="ClubDashboard">
            {clubData && <ClubNavbarVertical clubId={clubId} showHomepageButton={false} />}

            <div className='content'>
                <ClubDashboardHeader />
                {clubData && <ClubInfo clubData={clubData} />}
            </div>
        </div>
    );
}

export default ClubDashboard;
