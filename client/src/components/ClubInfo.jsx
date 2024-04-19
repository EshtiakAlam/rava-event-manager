import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../utils/FormatDate';
import { Link } from 'react-router-dom';
import ClubInfoSideBar from './ClubInfoSideBar';


export const ClubInfo = ({ clubData }) => {
    console.log(`ClubInfo te ashche:`,clubData);


    const members = [
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
    ];

    // Filter only panelist members
    const panelistMembers = members.filter(member => member.status === 'Panelist');
    // const advisorMembers = clubData.advisor || []; // Add a null check

    // Hardcoded example data for advisorMembers
    const advisorMembers = [{'name': "AsifSir", 'email':'asif@bracu.ac.bd'}, {'name': "LabibaMiss", 'email':'labiba@bracu.ac.bd'}]


    console.log(`Dashbaord e elam!`);
    console.log(clubData);
    console.log(`Still in dashboard..`);


    return (
        <div className="ClubData">
            <h1><span className='special-letter'>{clubData.title[0]}</span>{clubData.title.substring(1)} ({clubData.abbreviation})</h1>
            <h4> - {clubData.description}</h4>
            
            <div className='OuterLayer'>
                <div className='case1'>
                <div className='heading'>
                    <h3>Current panel</h3>
                </div>
                <div className='PanelInfo'>
                    {panelistMembers.map((member, index) => (
                        <div className='EachPanelist' key={index}>
                            <p><strong>{member.name}</strong></p>
                            <p>{member.email}</p>
                        </div>
                    ))}
                </div>
                <h3>Club Advisors</h3>
                <div className='AdvisorInfo'>
                    {advisorMembers.map((advisor, index) => (
                        <div className='EachAdvisor' key={index}>
                            <p><strong> {advisor.name} </strong></p>
                            <p>{advisor.email}</p>
                        </div>
                    ))}
                </div>
                <h2 style={{marginBottom: '50px'}}><FontAwesomeIcon icon={faMailBulk} style={{ fontSize: '2em' }} /> Club email: {clubData.contactInformation.email}</h2>
            </div>
            <div className='case2'>
                {clubData && <ClubInfoSideBar clubData={clubData} />}
            </div>
            </div>
        </div>
    );
};

export default ClubInfo;
