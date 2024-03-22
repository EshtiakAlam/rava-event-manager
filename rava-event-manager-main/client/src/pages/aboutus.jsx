// AboutUs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutUs = () => {
  const [aboutInfo, setAboutInfo] = useState({});

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const res = await axios.get('/api/about');
      setAboutInfo(res.data);
    } catch (error) {
      console.error('Error fetching about information:', error);
    }
  };

  return (
    <div>
      <h2>{aboutInfo.companyName}</h2>
      <p><strong>About:</strong> {aboutInfo.about}</p>
      <p><strong>Mission:</strong> {aboutInfo.mission}</p>
      <p><strong>Vision:</strong> {aboutInfo.vision}</p>
      {/* Add more components to display additional information */}
    </div>
  );
};

export default AboutUs;
