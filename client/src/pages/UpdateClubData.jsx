import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ClubNavbarVertical from "../components/ClubNavbarVertical";
import ClubDashBoardHeader from "../components/ClubDashboardHeader";

const UpdateClubData = () => {
    const { _id } = useParams();

    const clubId = _id;
    const [clubData, setClubData] = useState(null);
    const [editedClubData, setEditedClubData] = useState({
        title: '',
        abbreviation: '',
        description: '',
        contactInformation: { email: '' },
        advisor: '',
        panelist: [{ name: '', email: '' }],
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    console.log(`CLUB ID:`,clubId);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await fetch(`/api/clubs/${clubId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch club data');
                }
                const json = await response.json();
                setClubData(json);
                // Initialize editedClubData with club data, replacing empty fields with "None"
                setEditedClubData({
                    title: json?.title || 'None',
                    abbreviation: json?.abbreviation || 'None',
                    description: json?.description || 'None',
                    contactInformation: { email: json?.contactInformation?.email || 'None' },
                    advisor: json?.advisor || 'None',
                    panelist: json?.panel || [{ name: 'None', email: 'None' }],
                });
            } catch (error) {
                console.error('Error fetching club data:', error.message);
            }
        };

        if (clubId) {
            fetchClubData();
        }
    }, [clubId]); // Fetch data when clubId changes

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/clubs/${_id}`, {
                method: 'PATCH',
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

    console.log(`CLUB INFO:`, clubData);

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
                { name: 'New Member/Advisor', email: '' }
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

    const panelist = clubData?.panel || [];

    return (
        <div className="UpdateClubData">
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />


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
                            <label htmlFor="abbreviation">Club Abbreviation:</label>
                            <input
                                type="text"
                                id="abbreviation"
                                name="abbreviation"
                                value={editedClubData.abbreviation}
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
                            <label htmlFor="advisor">Club Advisor:</label>
                            <textarea
                                id="advisor"
                                name="advisor"
                                value={editedClubData.advisor}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="panelists">Panelists:</label>
                            {panelist.map((panelist, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Panelist Name"
                                        value={panelist.name}
                                        onChange={(e) => {
                                            const newPanelists = [...editedClubData.panelist];
                                            newPanelists[index].name = e.target.value;
                                            setEditedClubData({ ...editedClubData, panelist: newPanelists });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Panelist Email"
                                        value={panelist.email}
                                        // Inside the onChange handler for panelists' name and email inputs
                                        onChange={(e) => {
                                            const newPanelists = [...editedClubData.panelist];
                                            newPanelists[index].email = e.target.value;
                                            setEditedClubData({ ...editedClubData, panelist: newPanelists });
                                        }}
                                    />
                                    <div className="Keys">
                                        <button type="button" onClick={() => addMemberOrAdvisor('panelist')}>Edit Panelist</button>
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
