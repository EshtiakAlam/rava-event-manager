import React, { useState, useEffect } from 'react';
import ClubDashBoardHeader from "../components/ClubDashboardHeader";
import ClubNavbarVertical from "../components/ClubNavbarVertical";
import { useParams } from 'react-router-dom';

const ClubAddVolunteer = () => {
    const { _id } = useParams();

    const [studentID, setStudentID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if all fields are filled
        if (!studentID || !name || !department || !email || !joiningDate) {
            setError("Please fill out all fields.");
            return;
        }

        // If all fields are filled, proceed with form submission
        console.log("Form submitted successfully!");
        setError(null);

        // Reset form fields after successful submission
        setStudentID("");
        setName("");
        setDepartment("");
        setEmail("");
        setJoiningDate("");

        // Display "Request sent" message
        setRequestSent(true);

        // Clear the message after 3 seconds
        setTimeout(() => {
            setRequestSent(false);
        }, 3000);
    };

    return (
        <div className='ClubAddVolunteer'>
            <ClubNavbarVertical clubId={_id} showHomepageButton={true} />
            <ClubDashBoardHeader />
            
            <h1 className='extra'><span className='special-letter'>A</span>dd Volunteer</h1>

            <div className="createVolunteerFromClub" style={{ marginTop: '50px', marginBottom: '100px' }}>
                <form className="createVolunteer" onSubmit={handleSubmit}>
                    <label>Student ID</label>
                    <input
                        type="text"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Joining Date</label>
                    <input
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                    />
                    <button type="submit">Add Volunteer</button>
                    {error && <div className="error">{error}</div>}
                    {requestSent && <div className="Club-Volunteer-success-message">Volunteer added</div>}
                </form>
            </div>
        </div>
    );
}

export default ClubAddVolunteer;
