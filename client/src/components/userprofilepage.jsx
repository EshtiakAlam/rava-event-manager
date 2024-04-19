import React, { useState, useEffect } from 'react';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userId');

    // Fetch user profile data using the user ID
    console.log(`${userId}`)
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/profile/userprofiles/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          throw new Error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Status: {userProfile.status}</p>
          <p>Student ID: {userProfile.studentId}</p>
          <p>Email: {userProfile.email}</p>
          <p>Member Status: {userProfile.memberStatus}</p>
          <p>Department: {userProfile.department}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
