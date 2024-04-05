import React, { useState } from 'react';

const ClubSignup = () => {
  const [formData, setFormData] = useState({
    title: '',
    abbreviation: '',
    description: '',
    contactInformation: { email: '' },
    events: [],
    members: []
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'advisor') {
      // Prevent sending an empty string for the advisor field
      setFormData({ ...formData, [name]: value || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clubinfo/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Club created successfully:', data);
        // Handle the response accordingly, e.g., redirect or show success message
      } else {
        const errorMessage = await response.text();
        console.error('Error creating club:', errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="container club-signup"> {/* Added class name for styling */}
      <h2>Club Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="abbreviation">Abbreviation:</label>
          <input
            type="text"
            id="abbreviation"
            name="abbreviation"
            value={formData.abbreviation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInformation">Contact Email:</label>
          <input
            type="email"
            id="contactInformation"
            name="contactInformation"
            value={formData.contactInformation.email}
            onChange={(e) => setFormData({ ...formData, contactInformation: { email: e.target.value } })}
          />
        </div>
        {/* Add input fields for panel, advisor, events, and members if needed */}
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default ClubSignup;
