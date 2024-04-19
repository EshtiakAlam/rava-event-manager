import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbarVertical from '../components/AdminNavbarVertical';
import AdminDashBoardHeader from '../components/AdminDashboardHeader';

const AdminEditLogistics = () => {
    const { item, _id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [logisticData, setLogisticData] = useState(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/api/events/${_id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch event with ID ${_id}`);
                }
                const eventData = await response.json();
                setEventData(eventData);
            } catch (error) {
                console.error('Error fetching event data:', error.message);
            }
        };

        fetchEventData();
    }, [_id]);

    useEffect(() => {
        if (eventData) {
            const logistics = eventData.logistics.find(logistic => logistic.item === item);
            setLogisticData(logistics);
        }
    }, [eventData, item]);

    const handleRevertDecision = async () => {
        try {
            const updatedLogisticData = { ...logisticData, approved: logisticData.approved === 'true' ? 'false' : 'true' };
            const response = await fetch(`/api/events/${_id}/logistics/${logisticData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLogisticData),
            });
            if (!response.ok) {
                throw new Error('Failed to revert decision');
            }
            setLogisticData(updatedLogisticData);
        } catch (error) {
            console.error('Error reverting decision:', error.message);
        }
    };

    const handleAccept = async () => {
        try {
            const updatedLogisticData = { ...logisticData, approved: 'true' };
            const response = await fetch(`/api/events/${_id}/logistics/${logisticData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLogisticData),
            });
            if (!response.ok) {
                throw new Error('Failed to accept logistic');
            }
            setLogisticData(updatedLogisticData);
        } catch (error) {
            console.error('Error accepting logistic:', error.message);
        }
    };

    const handleReject = async () => {
        try {
            const updatedLogisticData = { ...logisticData, approved: 'false' };
            const response = await fetch(`/api/events/${_id}/logistics/${logisticData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLogisticData),
            });
            if (!response.ok) {
                throw new Error('Failed to reject logistic');
            }
            setLogisticData(updatedLogisticData);
        } catch (error) {
            console.error('Error rejecting logistic:', error.message);
        }
    };

    return (
        <div className="AdminEditLogistics">
            <AdminNavbarVertical showHomepageButton={true} />
            <AdminDashBoardHeader />

            <h1 className='extra'><span className='special-letter'>R</span>eview Logistic</h1>
            {logisticData ? (
                <form className="admin-logistics-form-wrapper">
                    <div>
                        <label>Club Name:</label>
                        <input 
                            type="text" 
                            value={eventData.organizer} 
                            disabled 
                        />
                    </div>
                    <div>
                        <label>Event Name:</label>
                        <input 
                            type="text" 
                            value={eventData.title} 
                            disabled 
                        />
                    </div>
                    <div>
                        <label>Item:</label>
                        <input 
                            type="text" 
                            value={logisticData.item} 
                            disabled 
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input 
                            type="text" 
                            value={logisticData.quantity} 
                            disabled 
                        />
                    </div>
                    <div>
                        {logisticData.approved !== 'none' && (
                            <>
                                <p>Status: {logisticData.approved === 'true' ? 'Approved' : 'Rejected'}</p>
                                <button className="admin-button" onClick={handleRevertDecision}>Revert Decision</button>
                            </>
                        )}
                        {logisticData.approved === 'none' && (
                            <>
                            <div className='admin-logistic-buttons'>
                                <button className="admin-button" onClick={handleAccept}>Accept</button>
                            </div>
                            <div className='admin-logistic-buttons'>
                                <button className="admin-button" onClick={handleReject}>Reject</button>
                            </div>
                            </>
                        )}
                    </div>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AdminEditLogistics;
