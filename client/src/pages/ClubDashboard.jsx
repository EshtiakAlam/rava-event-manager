import React, { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubInfo from '../components/ClubInfo';
import ClubDashboardHeader from '../components/ClubDashboardHeader';
import ShowClubEvents from './ShowClubEvents';

const ClubDashboard = () => {
    const [clubData, setClubData] = useState(null);
    const clubId = '65fe1c21a6ccec4a9928b348';             
    // MANUALLY SET KORA; PORE PROP HISHABE PASS KORABO FROM LOGIN

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


//shafi_club_work_pt1