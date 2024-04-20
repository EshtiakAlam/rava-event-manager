import React, { useState, useEffect } from 'react';
import formatDate from "../utils/FormatDate"; 
import { Link, useParams } from 'react-router-dom';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubDashboardHeader, { ClubDashBoardHeader } from '../components/ClubDashboardHeader';

export const ClubVolunteers = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState(null);
    const [popupContent, setPopupContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [pendingMembers, setPendingMembers] = useState([]);
    const [acceptedMembers, setAcceptedMembers] = useState([]);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch(`/api/clubs/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const data = await response.json();
                setClubData(data);
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        fetchClubData();
    }, [_id]);

    useEffect(() => {
        const fetchPendingMembers = async () => {
            try {
                const response = await fetch(`/api/club-members/pending-by-club/${clubData._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pending members');
                }
                const data = await response.json();
                setPendingMembers(data);
            } catch (error) {
                console.error('Error fetching pending members:', error.message);
            }
        };

        const fetchAcceptedMembers = async () => {
            try {
                const response = await fetch(`/api/club-members/approved-by-club/${clubData._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch accepted members');
                }
                const data = await response.json();
                setAcceptedMembers(data);
            } catch (error) {
                console.error('Error fetching accepted members:', error.message);
            }
        };

        if (clubData) {
            fetchPendingMembers();
            fetchAcceptedMembers();
        }
    }, [clubData]);

    useEffect(() => {
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
            }
        };
    }, []);

    const calculateYearsOfMembership = (joinDate) => {
        const currentDate = new Date();
        const years = currentDate.getFullYear() - new Date(joinDate).getFullYear();
        return years <= 0 ? "New" : `${years} yr`;
    };

    const handleMouseEnter = (content) => {
        setPopupContent(content);
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    const promoteMember = async (index) => {
        const memberToPromote = acceptedMembers[index];
        memberToPromote.status = "Panelist";
    
        try {
            // First PATCH operation to update member's status
            const memberResponse = await fetch(`/api/club-members/${memberToPromote._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: "Panelist" }),
            });
            if (!memberResponse.ok) {
                throw new Error('Failed to promote member');
            }
    
            // Second PATCH operation to update club's panel array
            const clubResponse = await fetch(`/api/clubs/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ panel: [...clubData.panel, memberToPromote._id] }), // Assuming panelist is an array in clubData
            });
            if (!clubResponse.ok) {
                throw new Error('Failed to update club panel');
            }
    
            // Update local state
            const updatedAcceptedMembers = [...acceptedMembers];
            updatedAcceptedMembers.splice(index, 1);
            setAcceptedMembers(updatedAcceptedMembers);
    
            console.log("Promoted:", memberToPromote);
        } catch (error) {
            console.error('Error promoting member:', error.message);
        }
    };
    
    
    const fireMember = async (index) => {
        const memberToFire = acceptedMembers[index];
        memberToFire.status = "Terminated";
    
        try {
            const response = await fetch(`/api/club-members/${memberToFire._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: "Terminated" }),
            });
            if (!response.ok) {
                throw new Error('Failed to terminate member');
            }
    
            const updatedAcceptedMembers = [...acceptedMembers];
            updatedAcceptedMembers.splice(index, 1);
            setAcceptedMembers(updatedAcceptedMembers);
    
            console.log("Terminated:", memberToFire);
        } catch (error) {
            console.error('Error terminating member:', error.message);
        }
    };
    

    const acceptRequest = async (index) => {
        const memberToAccept = pendingMembers[index];
        memberToAccept.status = "Member";
        memberToAccept.joinDate = new Date().toISOString();

        try {
            const response = await fetch(`/api/club-members/${memberToAccept._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: "Member", joinDate: memberToAccept.joinDate }),
            });
            if (!response.ok) {
                throw new Error('Failed to accept member');
            }

            const updatedPendingMembers = [...pendingMembers];
            updatedPendingMembers.splice(index, 1);
            setPendingMembers(updatedPendingMembers);

            setAcceptedMembers(prevAcceptedMembers => [...prevAcceptedMembers, memberToAccept]);

            console.log("Accepted:", memberToAccept);
        } catch (error) {
            console.error('Error accepting member:', error.message);
        }
    };

    const declineRequest = async (index) => {
        const memberToDecline = pendingMembers[index];
        memberToDecline.status = "Terminated";

        try {
            const response = await fetch(`/api/club-members/${memberToDecline._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: "Terminated" }),
            });
            if (!response.ok) {
                throw new Error('Failed to decline member');
            }

            const updatedPendingMembers = [...pendingMembers];
            updatedPendingMembers.splice(index, 1);
            setPendingMembers(updatedPendingMembers);

            console.log("Declined:", memberToDecline);
        } catch (error) {
            console.error('Error declining member:', error.message);
        }
    };

    console.log(`Ekhane club er id is:`, _id);

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

    return (
        <div className="ClubVolunteers">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />

            <h1 className='extra'><span className='special-letter'>V</span>olunteers</h1>
            
            {acceptedMembers.length === 0 ? (
                <h1 className='Nobody'>No one has joined yet</h1>
            ) : (
                <div className="headers">
                    <div className="header-1">
                        <h1>Student ID</h1>
                        {acceptedMembers.map((member, index) => (
                            <p key={index}><strong>{member.studentID}</strong></p>
                        ))}
                    </div>
                    <div className="header-2">
                        <h1>Name</h1>
                        {acceptedMembers.map((member, index) => (
                            <p 
                                key={index} 
                                onMouseEnter={() => handleMouseEnter(member.name)} 
                                onMouseLeave={handleMouseLeave}
                                className={member.name.length > 15 ? 'truncated' : ''}
                            >
                                {member.name}
                            </p>
                        ))}
                    </div>
                    <div className="header-3">
                        <h1>Department</h1>
                        {acceptedMembers.map((member, index) => (
                            <p key={index}>{member.department}</p>
                        ))}
                    </div>
                    <div className="header-4">
                        <h1>Email</h1>
                        {acceptedMembers.map((member, index) => (
                            <p 
                                key={index} 
                                onMouseEnter={() => handleMouseEnter(member.email)} 
                                onMouseLeave={handleMouseLeave}
                                className={member.email.length > 15 ? 'truncated' : ''}
                            >
                                <strong>{member.email}</strong>
                            </p>
                        ))}
                    </div>
                    
                    <div className="header-6">
                        <h1>Action</h1>
                        {acceptedMembers.map((member, index) => (
                            <div key={index} className="action-buttons">
                                <button className="promote-button" onClick={() => promoteMember(index)}>Promote</button>
                                <button className="fire-button" onClick={() => fireMember(index)}>Fire</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {pendingMembers.length === 0 ? (
                <h1 className='Nobody'>No pending requests</h1>
            ) : (
                <div>
                    <h1 className='extra'><span className="special-letter">P</span>ending Volunteer Requests</h1>
                    <div className="headers2">
                        <div className="header-1">
                            <h1>Student ID</h1>
                            {pendingMembers.map((member, index) => (
                                <p key={index}><strong>{member.studentID}</strong></p>
                            ))}
                        </div>
                        <div className="header-2">
                            <h1>Name</h1>
                            {pendingMembers.map((member, index) => (
                                <p 
                                    key={index} 
                                    onMouseEnter={() => handleMouseEnter(member.name)} 
                                    onMouseLeave={handleMouseLeave}
                                    className={member.name.length > 15 ? 'truncated' : ''}
                                >
                                    {member.name}
                                </p>
                            ))}
                        </div>
                        <div className="header-3">
                            <h1>Department</h1>
                            {pendingMembers.map((member, index) => (
                                <p key={index}>{member.department}</p>
                            ))}
                        </div>
                        <div className="header-4">
                            <h1>Email</h1>
                            {pendingMembers.map((member, index) => (
                                <p 
                                    key={index} 
                                    onMouseEnter={() => handleMouseEnter(member.email)} 
                                    onMouseLeave={handleMouseLeave}
                                    className={member.email.length > 15 ? 'truncated' : ''}
                                >
                                    <strong>{member.email}</strong>
                                </p>
                            ))}
                        </div>
                        <div className="header-5">
                            <h1>Action</h1>
                            {pendingMembers.map((member, index) => (
                                <div key={index} className="action-buttons">
                                    <button className="accept-button" onClick={() => acceptRequest(index)}>Accept</button>
                                    <button className="decline-button" onClick={() => declineRequest(index)}>Decline</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="popup">
                    <p>{popupContent}</p>
                </div>
            )}

            <div>
                <Link to={`/club/addVolunteer/${_id}`} className='clubAddVolunteer'>
                    <b>ADD NEW VOLUNTEER</b>
                </Link>
            </div>
        </div>
    );
}

export default ClubVolunteers;
