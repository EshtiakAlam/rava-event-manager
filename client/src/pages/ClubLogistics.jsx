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
        const fetchAllLogistics = async () => {
            try {
                const response = await fetch(`/api/logistics/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch logistics data');
                }
                const json = await response.json();
                setAllLogistics(json);
            } catch (error) {
                console.error('Error fetching logistics data:', error.message);
            }
        };

        fetchAllLogistics();
    }, [_id]);

    console.log(`ALLLLL:`, allLogistics);

    useEffect(() => {
        if (Array.isArray(allLogistics.logisticsRequests)) {
            const pending = [];
            const approved = [];
            for (let i = 0; i < allLogistics.logisticsRequests.length; i++) {
                const logistic = allLogistics.logisticsRequests[i];
                if (logistic.status === "Pending") {
                    pending.push(logistic);
                } else {
                    approved.push(logistic);
                }
            }
            setPendingLogistics(pending);
            setApprovedLogistics(approved);
        }
    }, [allLogistics]);
    

    console.log(`After filter`);
    console.log(pendingLogistics);
    console.log(`2`);
    console.log(approvedLogistics);

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
                                <p key={index}><strong>{logistic.event.title}</strong></p>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Item Name</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index}>{logistic.items.name}</p>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Quantity</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index}>{logistic.items.quantity}</p>
                            ))}
                        </div>
                        <div className="header-4">
                            <h1>Status</h1>
                            {approvedLogistics.map((logistic, index) => (
                                <p key={index} className={logistic.status === 'Approved' ? 'approved' : 'rejected'}>
                                    <strong>{logistic.status}</strong>
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
