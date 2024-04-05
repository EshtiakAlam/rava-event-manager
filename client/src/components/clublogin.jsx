import React, { useState } from 'react';

const ClubLogin = () => {
  const [formData, setFormData] = useState({
    abbreviation: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clubinfo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
    
        // Save clubID to localStorage
        localStorage.setItem('clubID', data.clubId);
    
        // Redirect to club dashboard or display success message
      } else {
        const errorMessage = await response.text();
        console.error('Login failed:', errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };
  

  return (
    <div className="container">
      <h2>Club Login</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default ClubLogin;
