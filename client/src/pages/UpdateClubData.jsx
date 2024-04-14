import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import ClubDashboardHeader from '../components/ClubDashboardHeader';

const UpdateClubData = () => {
    const { _id } = useParams();
    const [clubData, setClubData] = useState(null);
    const [editedClubData, setEditedClubData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Hardcoded members data
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

    const panelists = members.filter(member => member.status === 'Panelist');

    // Fetch club data on component mount
    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch(`/api/clubs/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const clubData = await response.json();
                setClubData(clubData);
                // Initialize editedClubData with club data, replacing empty fields with "None"
                setEditedClubData({
                    title: clubData.title || 'None',
                    abbreviation: clubData.abbreviation || 'None',
                    description: clubData.description || 'None',
                    contactInformation: clubData.contactInformation || 'None',
                    advisors: clubData.advisors || [{ name: 'None', email: 'None' }],
                    panelists: panelists || [{ name: 'None', email: 'None' }],
                });
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        fetchClubData();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/clubs/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedClubData),
            });
            if (!response.ok) {
                throw new Error('Failed to update club data');
            }
            setClubData(editedClubData); // Update clubData state with edited data
            setSuccess('Club data updated successfully!');
            setError(null);
        } catch (error) {
            console.error('Error updating club data:', error.message);
            setError(error.message);
            setSuccess(null);
        }
    };

    // Function to handle input change in form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedClubData({
            ...editedClubData,
            [name]: value,
        });
    };

    // Function to add a new member or advisor
    const addMemberOrAdvisor = (type) => {
        setEditedClubData({
            ...editedClubData,
            [type]: [
                ...editedClubData[type],
                { name: 'New Member/Advisor', email: 'newmember@example.com' }
            ]
        });
    };

    // Function to delete a member or advisor
    const deleteMemberOrAdvisor = (type, index) => {
        const newData = [...editedClubData[type]];
        newData.splice(index, 1);
        setEditedClubData({
            ...editedClubData,
            [type]: newData
        });
    };

    console.log(`Update korar form e ashche:`,clubData);

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
        <div className="UpdateClubData">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashboardHeader />

            <h1 className="extra"><span className="special-letter">E</span>dit Key Club Details</h1>

            <div className="edit-club-wrapper">
                {clubData && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Club Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editedClubData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Club Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedClubData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="advisors">Advisors:</label>
                            {editedClubData.advisors.map((advisor, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Advisor Name"
                                        value={advisor.name}
                                        onChange={(e) => {
                                            const newAdvisors = [...editedClubData.advisors];
                                            newAdvisors[index].name = e.target.value;
                                            setEditedClubData({ ...editedClubData, advisors: newAdvisors });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Advisor Email"
                                        value={advisor.email}
                                        onChange={(e) => {
                                            const newAdvisors = [...editedClubData.advisors];
                                            newAdvisors[index].email = e.target.value;
                                            setEditedClubData({ ...editedClubData, advisors: newAdvisors });
                                        }}
                                    />
                                    <div className="Keys">
                                        <button type="button" onClick={() => deleteMemberOrAdvisor('advisors', index)}>Delete</button>
                                        <button type="button" onClick={() => addMemberOrAdvisor('advisors')}>Add Advisor</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="panelists">Panelists:</label>
                            {editedClubData.panelists.map((panelist, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Panelist Name"
                                        value={panelist.name}
                                        onChange={(e) => {
                                            const newPanelists = [...editedClubData.panelists];
                                            newPanelists[index].name = e.target.value;
                                            setEditedClubData({ ...editedClubData, panelists: newPanelists });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Panelist Email"
                                        value={panelist.email}
                                        onChange={(e) => {
                                            const newPanelists = [...editedClubData.panelists];
                                            newPanelists[index].email = e.target.value;
                                            setEditedClubData({ ...editedClubData, panelists: newPanelists });
                                        }}
                                    />
                                    <div className="Keys">
                                        <button type="button" onClick={() => deleteMemberOrAdvisor('panelists', index)}>Delete</button>
                                        <button type="button" onClick={() => addMemberOrAdvisor('panelists')}>Add Panelist</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {error && <p className="error-message">Error: {error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateClubData;
