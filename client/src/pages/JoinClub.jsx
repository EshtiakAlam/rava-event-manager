import React, { useState, useEffect } from 'react';
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

        // // Redirect to a different route after form submission
        // navigate('/clubs/club');

        // Display "Request sent" message
        setRequestSent(true);

        // Clear the message after 3 seconds
        setTimeout(() => {
            setRequestSent(false);
        }, 3000);
    };

    return (
        <div className="createNewEventFromClub" style = {{marginTop: '50px', marginBottom: '100px'}}>
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
                    style={{height: 'auto' }}
                />
                <label>Expectations from the Club</label>
                <input
                    type="text"
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    style={{height: 'auto' }}
                />
                <label>Skills</label>
                <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
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
