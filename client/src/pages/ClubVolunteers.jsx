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
            { "name": "Shamsur Shafi", "status": "Panelist", 'studentId': '001', 'email': "m.s.shafi@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "CSE" },
            { "name": "Eshtiak Shihab", "status": "Panelist", 'studentId': '002', 'email': "shihabi@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "EEE" },
            { "name": "Karim Benz", "status": "Panelist", 'studentId': '003', 'email': "karim.israr@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "EEE" },
            { "name": "Maruf", "status": "Panelist", 'studentId': '004', 'email': "maruf@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "ANT" },
            { "name": "Anurag Sikder", "status": "Member", 'studentId': '005', 'email': "anurag@g.bracu.ac.bd", 'memberStatus': 'Department Lead', 'department': "ECO" },
            { "name": "Nuzhat Rahman", "status": "Member", 'studentId': '006', 'email': "catto@g.bracu.ac.bd", 'memberStatus': 'Volunteer', 'department': "ANT" },
            { "name": "Nuhash Neeha", "status": "Member", 'studentId': '007', 'email': "kobir.bhai@g.bracu.ac.bd", 'memberStatus': 'Volunteer', 'department': "CS" },
            { "name": "Raki", "status": "Member", 'studentId': '008', 'email': "original.shafee@g.bracu.ac.bd", 'memberStatus': 'Volunteer', 'department': "MNS" },
            { "name": "Imtela Islam", "status": "Member", 'studentId': '008', 'email': "married.hu@g.bracu.ac.bd", 'memberStatus': 'Department Lead', 'department': "MNS" }
        ],
        "panel": [
            { "$oid": "6606ce87735cc60ca01a3f26" },
            { "$oid": "6606d43cb3ede7bc50db6a13" },
            { "$oid": "6606d10f735cc60ca01a3f28" },
            { "$oid": "6606d159735cc60ca01a3f2a" }
        ],
        "title": "BRAC University Computer Club"
    };

    const members = club_info.members;

    const normalMembers = members.filter(member => member.status === 'Member');

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

    return (
        <div className="ClubVolunteers">
            <ClubNavbarVertical showHomepageButton={false} />
            <ClubDashBoardHeader />

            <div className="headers">
                <div className="header-1">
                    <h1>Student ID</h1>
                    {normalMembers.map((member, index) => (
                        <p key={index}>{member.studentId}</p>
                    ))}
                </div>
                <div className="header-2">
                    <h1>Name</h1>
                    {normalMembers.map((member, index) => (
                        <p key={index}>{member.name}</p>
                    ))}
                </div>
                <div className="header-3">
                    <h1>Department</h1>
                    {normalMembers.map((member, index) => (
                        <p key={index}>{member.department}</p>
                    ))}
                </div>
                <div className="header-4">
                    <h1>Status</h1>
                    {normalMembers.map((member, index) => (
                        <p key={index}>{member.memberStatus}</p>
                    ))}
                </div>
                <div className="header-5">
                    <h1>Email</h1>
                    {normalMembers.map((member, index) => (
                        <p key={index}>{member.email}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClubVolunteers;
