import React, { useState, useEffect } from 'react';
import formatDate from "../utils/FormatDate"; 
import ClubDashBoardHeader from '../components/ClubDashboardHeader';
import ClubNavbarVertical from '../components/ClubNavbarVertical';
import { Link } from 'react-router-dom';

export const ShowClubEvents = () => {

    const club_info = {"abbreviation":"BUCC","advisor":[{"name":"Asif Sir","email":"asif@bracu.ac.bd"},{"name":"Labiba","email":"labiba@bracu.ac.bd"}],"contactInformation":"bucc@g.bracu.ac.bd","description":"Computer Enthusiast Hub","events":[""],"members":[{"$oid":"65e2d466a9e4197986c16aeb"},{"$oid":"6606d237735cc60ca01a3f2e"},{"$oid":"6606d27b735cc60ca01a3f2f"},{"$oid":"6606d290735cc60ca01a3f30"},{"$oid":"6606d2a7735cc60ca01a3f31"}],"panel":[{"$oid":"6606ce87735cc60ca01a3f26"},{"$oid":"6606d43cb3ede7bc50db6a13"},{"$oid":"6606d10f735cc60ca01a3f28"},{"$oid":"6606d159735cc60ca01a3f2a"}],"title":"BRAC University Computer Club"};

    const eventsList = [
        {"_id":{"$oid":"6607531c5a02432126aba76e"},"title":"Fitness Bootcamp","organizer":"BRAC University Fitness Club","date":"31/03/2024","location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"KHUB CODING SHIKHA HOBE KHUB MASTI HOBE"},
        {"_id":{"$oid":"660753575a02432126aba76f"},"title":"Programming Olympiad","organizer":"BRAC University Computer Club","date":"15/04/2024","location":"FitFusion Gym","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Event for nerds"},
        {"_id":{"$oid":"660753725a02432126aba770"},"title":"Programming Bootcamp","organizer":"BRAC University Computer Club","date":"20/04/2024","location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":true,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Trainee nerds enterr"},
        {"_id":{"$oid":"660753835a02432126aba771"},"title":"Robotics Bootcamp","organizer":"BRAC University Robotics Club","date":"10/07/2024","location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Optimus Prime says Hi"},
    ];

    const clubTitle = club_info.title;

    // Filter events where organizer matches club title
    const filteredEvents = eventsList.filter(event => event.organizer === clubTitle);

    useEffect(() => {
        // Remove the Navbar component from the DOM when ClubDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when ClubDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
            }
        };
    }, []);

    return ( 
        <div className="ShowClubEvents">
            <ClubNavbarVertical showHomepageButton={true} />
            <ClubDashBoardHeader />
            
            <h1 className='extra'>Upcoming <span className='special-letter'>{club_info.abbreviation}</span> Events</h1>
            
            <div className="headers">
                <div className="header-left">
                    <h1>Event Name</h1>
                </div>
                <div className="header-mid">
                    <h1>Event Date</h1>
                </div>
                <div className="header-right">
                    <h1>Decision Status</h1>
                </div>
            </div>
            
                {filteredEvents.map((event, index) => (
                    <div className="info" key={index}>
                        <div className="info-left">
                            <h3>{event.title}</h3>
                        </div>
                        <div className="info-mid">
                            <h3>{ event.date}</h3>
                        </div>
                        <div className="info-right">
                            <h3>{event.approval ? <p1>Approved</p1> : <p2>Not Approved</p2>}</h3>
                        </div>
                    </div>
                ))}

                <h2>Events Created</h2>
                <div className="Info">
                    <div className="InfoContent">
                        {filteredEvents.map((event, index) => (
                            <div className="EachInfo" key={index}>
                                <div className="ContentPart">
                                    <h3><strong>{event.title}</strong></h3>
                                    <div className="ContentPartSplit">
                                        <p><b><span className="special-letter">Date:</span> {event.tagline}</b></p>
                                        <div className='event-links'>
                                            <Link to={`/events/${event._id}`} className="EventLinkButton">
                                                <p>View Event</p>
                                            </Link>
                                            
                                    
                                            <Link to={`/club/clubs/editevent`} className="EventLinkButton">
                                                <p>Edit Event</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='clubAddEvent'>
                    <Link to="/clubs/club/addEvent" className='ClubAddEvent'>
                        <b>CREATE NEW EVENT</b>
                    </Link>
                </div>
            
        </div>
    );
}
       

 
export default ShowClubEvents;
