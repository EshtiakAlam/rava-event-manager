import React, { useState, useEffect } from 'react';
import formatDate from "../utils/FormatDate"; 
import ClubDashBoardHeader from '../components/ClubDashboardHeader';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import { Link } from 'react-router-dom';

export const ClubVolunteers = () => {
    const club_info = {
        "abbreviation": "BUCC",
        "advisor": [
            { "name": "Asif Sir", "email": "asif@bracu.ac.bd" },
            { "name": "Labiba", "email": "labiba@bracu.ac.bd" }
        ],
        "contactInformation": "bucc@g.bracu.ac.bd",
        "description": "Computer Enthusiast Hub",
        "events": [""],
        "members": [
            { 'name': "Shamsur Shafi", "status": "Panelist", 'studentId': '001', 'email': "m.s.shafi@g.bracu.ac.bd", 'department': "CSE", 'joinDate': '2020-04-15T00:00:00.000Z' },
            { 'name': "Eshtiak Shihab", "status": "Panelist", 'studentId': '002', 'email': "shihabi@g.bracu.ac.bd", 'department': "EEE", 'joinDate': '2021-06-15T00:00:00.000Z' },
            { 'name': "Karim Benz", "status": "Panelist", 'studentId': '003', 'email': "karim.israr@g.bracu.ac.bd", 'department': "EEE" , 'joinDate': '2019-08-19T00:00:00.000Z' },
            { 'name': "Maruf", "status": "Panelist", 'studentId': '004', 'email': "maruf@g.bracu.ac.bd", 'department': "ANT" , 'joinDate': '2020-12-02T00:00:00.000Z'},
            { 'name': "Anurag Sikder", "status": "Member", 'studentId': '005', 'email': "anurag@g.bracu.ac.bd", 'department': "ECO"  , 'joinDate': '2023-04-15T00:00:00.000Z'},
            { 'name': "Haseen", "status": "None", 'studentId': '010', 'email': "haseen@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2023-03-13T00:00:00.000Z'},
            { 'name': "Nuzhat Rahman", "status": "Member", 'studentId': '006', 'email': "catto@g.bracu.ac.bd", 'department': "ANT" , 'joinDate': '2023-01-10T00:00:00.000Z'},
            { 'name': "Nuhash Neeha", "status": "Member", 'studentId': '007', 'email': "kobir.bhai@g.bracu.ac.bd", 'department': "CS" , 'joinDate': '2024-01-01T00:00:00.000Z'},
            { 'name': "Raki", "status": "Member", 'studentId': '008', 'email': "original.shafee.shamsur.shafi.nureaziz@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2024-03-13T00:00:00.000Z'},
            { 'name': "Imtela Islam", "status": "Member", 'studentId': '009', 'email': "married.hu@g.bracu.ac.bd", 'department': "MNS" , 'joinDate': '2019-09-22T00:00:00.000Z' },
            { 'name': "Maliha Sejutee", "status": "None", 'studentId': '012', 'email': "sejutee@g.bracu.ac.bd", 'department': "MIC" , 'joinDate': '2024-03-13T00:00:00.000Z'},
        ],
        
        "panel": [
            { "$oid": "6606ce87735cc60ca01a3f26" },
            { "$oid": "6606d43cb3ede7bc50db6a13" },
            { "$oid": "6606d10f735cc60ca01a3f28" },
            { "$oid": "6606d159735cc60ca01a3f2a" }
        ],
        "title": "BRAC University Computer Club"
    };

    const [panelistMembers, setPanelistMembers] = useState(club_info.members.filter(member => member.status === 'Panelist'));
    const [members, setMembers] = useState(club_info.members.filter(member => member.status === 'Member'));
    const [pendingMembers, setPendingMembers] = useState(club_info.members.filter(member => member.status === 'None'));
    const [popupContent, setPopupContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);

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

    // Function to calculate years of membership
    const calculateYearsOfMembership = (joinDate) => {
        const currentDate = new Date();
        const years = currentDate.getFullYear() - new Date(joinDate).getFullYear();
        return years <= 0 ? "New" : `${years} yr`;
    };

    // Function to handle mouse enter event on truncated text
    const handleMouseEnter = (content) => {
        setPopupContent(content);
        setShowPopup(true);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    // Function to promote a member to panelist
    const promoteMember = (index) => {
        const updatedMembers = [...members];
        const promotedMember = updatedMembers[index];
        promotedMember.status = "Panelist";
        setPanelistMembers(prevPanelistMembers => [...prevPanelistMembers, promotedMember]);
        setMembers(prevMembers => prevMembers.filter((_, i) => i !== index));
        console.log("Promoted:", promotedMember);
    };

    // Function to remove a member from the list
    const fireMember = (index) => {
        const updatedMembers = [...members];
        const terminatedMember = updatedMembers[index];
        terminatedMember.status = "Terminated";
        setMembers(prevMembers => prevMembers.filter((_, i) => i !== index));
        console.log("Terminated:", terminatedMember);
    };


    // Function to accept a pending request
    const acceptRequest = (index) => {
        const currentDate = new Date().toISOString(); // Get today's date in ISO format
        const acceptedMember = { ...pendingMembers[index], status: "Member", joinDate: currentDate };
        setPendingMembers(prevPendingMembers => prevPendingMembers.filter((_, i) => i !== index));
        setMembers(prevMembers => [...prevMembers, acceptedMember]);
        console.log("Accepted:", acceptedMember);
    };

    // Function to decline a pending request
    const declineRequest = (index) => {
        const declinedMember = pendingMembers[index];
        declinedMember.status = "Terminated";
        setPendingMembers(prevPendingMembers => prevPendingMembers.filter((_, i) => i !== index));
        console.log("Declined:", declinedMember);
    };

    return (
        <div className="ClubVolunteers">
            <ClubNavbarVertical showHomepageButton={true} />
            <ClubDashBoardHeader />

            <h1 className='extra'><span className='special-letter'>V</span>olunteers</h1>
            
            {members.length === 0 ? (
                <h1 className='Nobody'>No one has joined yet</h1>
            ) : (
                <div className="headers">
                    <div className="header-1">
                        <h1>Student ID</h1>
                        {members.map((member, index) => (
                            <p key={index}><strong>{member.studentId}</strong></p>
                        ))}
                    </div>
                    <div className="header-2">
                        <h1>Name</h1>
                        {members.map((member, index) => (
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
                        {members.map((member, index) => (
                            <p key={index}>{member.department}</p>
                        ))}
                    </div>
                    <div className="header-4">
                        <h1>Email</h1>
                        {members.map((member, index) => (
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
                        <h1>Membership</h1>
                        {members.map((member, index) => (
                            <p key={index}>{calculateYearsOfMembership(member.joinDate)}</p>
                        ))}
                    </div>
                    <div className="header-6">
                        <h1>Action</h1>
                        {members.map((member, index) => (
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
                                <p key={index}><strong>{member.studentId}</strong></p>
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
                <Link to="/club/addVolunteer" className='clubAddVolunteer'>
                    <b>ADD NEW VOLUNTEER</b>
                </Link>
            </div>
        </div>
    );
}

export default ClubVolunteers;
