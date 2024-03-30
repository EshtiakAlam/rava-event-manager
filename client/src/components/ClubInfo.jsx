import React from 'react';

export const ClubInfo = ({ clubData }) => {
    console.log(clubData);

    const members = [
        { 'name': "Shamsur Shafi", "status": "Panelist", 'studentId': '001', 'email': "m.s.shafi@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "CSE" },
        { 'name': "Eshtiak Shihab", "status": "Panelist", 'studentId': '002', 'email': "shihabi@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "EEE"  },
        { 'name': "Karim Benz", "status": "Panelist", 'studentId': '003', 'email': "karim.israr@g.bracu.ac.bd", 'memberStatus': 'None', 'department': "EEE"  },
        { 'name': "Maruf", "status": "Panelist", 'studentId': '004', 'email': "maruf@g.bracu.ac.bd", 'memberStatus': 'None' , 'department': "ANT" },
        { 'name': "Anurag Sikder", "status": "Member", 'studentId': '005', 'email': "anurag@g.bracu.ac.bd", 'memberStatus': 'Department Lead', 'department': "ECO"  },
        { 'name': "Nuzhat Rahman", "status": "Member", 'studentId': '006', 'email': "catto@g.bracu.ac.bd", 'memberStatus': 'Volunteer' , 'department': "ANT" },
        { 'name': "Nuhash Neeha", "status": "Member", 'studentId': '007', 'email': "kobir.bhai@g.bracu.ac.bd", 'memberStatus': 'Volunteer' , 'department': "CS" },
        { 'name': "Raki", "status": "Member", 'studentId': '008', 'email': "original.shafee@g.bracu.ac.bd", 'memberStatus': 'Volunteer' , 'department': "MNS" },
        { 'name': "Imtela Islam", "status": "Member", 'studentId': '008', 'email': "married.hu@g.bracu.ac.bd", 'memberStatus': 'Department Lead', 'department': "MNS"  },
    ];

    // Filter only panelist members
    const panelistMembers = members.filter(member => member.status === 'Panelist');
    let advisorMembers = clubData.advisor || []; // Add a null check

    // Hardcoded example data for advisorMembers
    advisorMembers = [{'name': "AsifSir", 'email':'asif@bracu.ac.bd'}, {'name': "LabibaMiss", 'email':'labiba@bracu.ac.bd'}]

    return (
        <div className="ClubData">
            <h1>{clubData.title} ({clubData.abbreviation})</h1>
            <h4> - {clubData.description}</h4>
            <h3>Current panel</h3>
            <div className='PanelInfo'>
                {panelistMembers.map((member, index) => (
                    <div className='EachPanelist' key={index}>
                        <p><strong>{member.name}</strong></p>
                        <p>Email: {member.email}</p>
                    </div>
                ))}
            </div>
            <h3>Club Advisors</h3>
            <div className='PanelInfo'>
                {advisorMembers.map((advisor, index) => (
                    <div className='EachPanelist' key={index}>
                        <p><strong></strong> {advisor.name}</p>
                        <p><strong></strong> {advisor.email}</p>
                    </div>
                ))}
            </div>
            <h2>Club email: {clubData.contactInformation}</h2>
        </div>
    );
};

export default ClubInfo;
