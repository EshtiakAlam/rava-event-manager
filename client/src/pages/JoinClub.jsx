import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Import useNavigate from react-router-dom

const JoinClub = () => {
    const clubID = useParams();
    const navigate = useNavigate(); // Initialize useNavigate

    const [name, setName] = useState("");
    const [studentID, setStudentID] = useState("");
    const [department, setDepartment] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false); // State variable for tracking request sent

    function changeBackgroundToHomePage() {
        //document.body.style.backgroundImage = `url(${bgImage})`;
        document.body.classList.add('body-home');
        return () => {

            document.body.classList.remove('body-home'); 
        };
    }

    useEffect(() => {
        changeBackgroundToHomePage();
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate if all fields are filled
        if ( !clubID || !studentID ||!name || !department || !contact || !email) {
            setError("Please fill out all fields.");
            return;
        }
        const club_member = {  clubID, studentID, name, department, contact, email };

        try {
            const response = await fetch(`/api/club-members/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(club_member),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }



            // Reset form fields after successful submission
            setName("");
            setStudentID("");
            setDepartment("");
            setContact("");
            setEmail("");
            setError(null);
            console.log("New Event added", json);

        } catch (error) {
            setError(error.message);
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="createNewEventFromClub-Page" style = {{marginTop: '50px', marginBottom: '100px'}}>
            <h3>Join the Club</h3>
            <form className="createNewEventFromClub" onSubmit={handleSubmit}>
                <label>Student Name</label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Student ID</label>
                <input
                    type="text"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <label>Department</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{height: 'auto' }}
                />
                <label>Contact</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{height: 'auto' }}
                />
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{height: 'auto' }}
                />
                <button type="submit">Send join request</button>
                {error && <div className="error">{error}</div>}
                {requestSent && <div className="Join-Club-success-message">Request sent</div>}
            </form>
        </div>
    );
}

export default JoinClub;
