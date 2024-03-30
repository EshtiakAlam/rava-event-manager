import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const JoinClub = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [studentName, setStudentName] = useState("");
    const [studentID, setStudentID] = useState("");
    const [previousExperience, setPreviousExperience] = useState("");
    const [expectations, setExpectations] = useState("");
    const [skills, setSkills] = useState("");
    const [error, setError] = useState(null);
    const [requestSent, setRequestSent] = useState(false); // State variable for tracking request sent

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if all fields are filled
        if (!studentName || !studentID || !previousExperience || !expectations || !skills) {
            setError("Please fill out all fields.");
            return;
        }

        // If all fields are filled, proceed with form submission
        // You can implement your form submission logic here
        console.log("Form submitted successfully!");
        setError(null);

        // Reset form fields after successful submission
        setStudentName("");
        setStudentID("");
        setPreviousExperience("");
        setExpectations("");
        setSkills("");

        // Redirect to a different route after form submission
        navigate('/clubs/club');

        // Display "Request sent" message
        setRequestSent(true);
    };

    return (
        <div className="createNewEventFromClub">
            <form className="createNewEvent" onSubmit={handleSubmit}>
                <h3>Join the Club</h3>
                <label>Student Name</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />
                <label>Student ID</label>
                <input
                    type="text"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <label>Previous Experience</label>
                <input
                    type="text"
                    value={previousExperience}
                    onChange={(e) => setPreviousExperience(e.target.value)}
                />
                <label>Expectations from the Club</label>
                <input
                    type="text"
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                />
                <label>Skills</label>
                <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />
                <button type="submit">Send join request</button>
                {error && <div className="error">{error}</div>}
                {requestSent && <div className="success-message">Request sent</div>}
            </form>
        </div>
    );
}

export default JoinClub;
