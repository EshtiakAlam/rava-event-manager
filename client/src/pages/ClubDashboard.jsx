import React, { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubInfo from '../components/ClubInfo';
import ClubDashboardHeader from '../components/ClubDashboardHeader';
import {useParams} from "react-router-dom";

const ClubDashboard = () => {
    const [clubData, setClubData] = useState(null);
    const { _id } = useParams();
    console.log("dashboard",_id)

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                console.log(`Information: ${_id}`)
                const response = await fetch(`/api/clubs/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const json = await response.json();
                setClubData(json);
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        if (_id) {
            fetchClubData();
        }
    }, [_id]); // Fetch data when clubId changes

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
            {clubData && <ClubNavbarVertical clubId={_id} showHomepageButton={false} />}

            <div className='content'>
                <ClubDashboardHeader />
                {clubData && <ClubInfo clubData={clubData} />}
            </div>
        </div>
    );
}

export default ClubDashboard;
