import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubDashBoardHeader from '../components/ClubDashboardHeader';

const ClubLogistics = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState([]);
    const [allLogistics, setAllLogistics] = useState([]);
    const [pendingLogistics, setPendingLogistics] = useState([]);
    const [approvedLogistics, setApprovedLogistics] = useState([]);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
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

        fetchClubData();
    }, [_id]);

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

    useEffect(() => {
        const fetchAllLogistics = async () => {
            try {
                const response = await fetch(`/api/logistics/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch logistics data');
                }
                const json = await response.json();
                // Flatten the logistics data to have separate entries for each item
                const flattenedLogistics = json.logisticsRequests.flatMap(logistic => {
                    return logistic.items.map(item => ({
                        ...logistic,
                        items: item
                    }));
                });
                setAllLogistics(flattenedLogistics);
            } catch (error) {
                console.error('Error fetching logistics data:', error.message);
            }
        };

        fetchAllLogistics();
    }, [_id]);

    useEffect(() => {
        if (Array.isArray(allLogistics)) {
            const pending = allLogistics.filter(logistic => logistic.status === 'Pending');
            const approved = allLogistics.filter(logistic => logistic.status !== 'Pending');

            setPendingLogistics(pending);
            setApprovedLogistics(approved);
        }
    }, [allLogistics]);

    return (
        <div className="ClubLogistics">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />

            {/* Approved Logistics */}
            <div className="summary-grid">
                <h1 className="extra"><span className="special-letter">S</span>ummary</h1>
                {approvedLogistics.length === 0 ? (
                    <h1 className='Nobody'>No logistic requests to report</h1>
                ) : (
                    <div className="headers">
                        <div className="header-1">
                            <h1>Event Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p><strong>{logistic.event.title}</strong></p>
                                </div>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Item Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p>{logistic.items.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Quantity</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p>{logistic.items.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="header-4">
                            <h1>Status</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p className={logistic.status === 'Approved' ? 'approved' : 'rejected'}>
                                        <strong>{logistic.status}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Pending Logistics */}
            <div className="pending-grid">
                <h1 className="extra"><span className="special-letter">P</span>ending Requests</h1>
                {pendingLogistics.length === 0 ? (
                    <h1 className='Nobody'>No logistic requests to report</h1>
                ) : (
                    <div className="headers">
                        <div className="header-1">
                            <h1>Event Name</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p><strong>{logistic.event.title}</strong></p>
                                </div>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Item Name</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p>{logistic.items.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Quantity</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p>{logistic.items.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="header-4">
                            <h1>Status</h1>
                            {pendingLogistics.map((logistic, index) => (
                                <div key={index}>
                                    <p className={logistic.status === 'Approved' ? 'approved' : 'rejected'}>
                                        <strong>{logistic.status}</strong>
                                    </p>
                                </div>
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
