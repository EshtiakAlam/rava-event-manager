import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export const EachClub = () => {

    const club_info = {"abbreviation":"BUCC","advisor":[{"name":"Asif Sir","email":"asif@bracu.ac.bd"},{"name":"Labiba","email":"labiba@bracu.ac.bd"}],"contactInformation":"bucc@g.bracu.ac.bd","description":"Computer Enthusiast Hub","events":[""],"members":[{"$oid":"65e2d466a9e4197986c16aeb"},{"$oid":"6606d237735cc60ca01a3f2e"},{"$oid":"6606d27b735cc60ca01a3f2f"},{"$oid":"6606d290735cc60ca01a3f30"},{"$oid":"6606d2a7735cc60ca01a3f31"}],"panel":[{"$oid":"6606ce87735cc60ca01a3f26"},{"$oid":"6606d43cb3ede7bc50db6a13"},{"$oid":"6606d10f735cc60ca01a3f28"},{"$oid":"6606d159735cc60ca01a3f2a"}],"title":"BRAC University Computer Club"};

    const eventsList = [
        {"_id":{"$oid":"6607531c5a02432126aba76e"},"title":"Fitness Bootcamp","organizer":"BRAC University Fitness Club","date":{"$date":{"$numberLong":"1713139200000"}},"location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"KHUB CODING SHIKHA HOBE KHUB MASTI HOBE"},
        {"_id":{"$oid":"660753575a02432126aba76f"},"title":"Programming Olympiad","organizer":"BRAC University Computer Club","date":{"$date":{"$numberLong":"1713139200000"}},"location":"FitFusion Gym","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Event for nerds"},
        {"_id":{"$oid":"660753725a02432126aba770"},"title":"Programming Bootcamp","organizer":"BRAC University Computer Club","date":{"$date":{"$numberLong":"1716422400000"}},"location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Trainee nerds enterr"},
        {"_id":{"$oid":"660753835a02432126aba771"},"title":"Robotics Bootcamp","organizer":"BRAC University Robotics Club","date":{"$date":{"$numberLong":"1711843200000"}},"location":"IT Lab","time":"6:00 AM","description":"Get fit and healthy with our intensive workout sessions!","highlights":["Intensive Workouts","Fitness Challenges"],"FAQ":[{"question":"What should I bring?","answer":"Please bring water, a towel, and comfortable workout clothes.","_id":{"$oid":"65fe15c94ce448e5ca0390da"}},{"question":"Is there a minimum age requirement?","answer":"Participants must be 18 years or older.","_id":{"$oid":"65fe15c94ce448e5ca0390db"}}],"like":{"$numberInt":"0"},"approval":false,"createdAt":{"$date":{"$numberLong":"1711150537516"}},"updatedAt":{"$date":{"$numberLong":"1711398329445"}},"__v":{"$numberInt":"0"},"tagline":"Optimus Prime says Hi"},
    ];

    const clubTitle = club_info.title;
    console.log(clubTitle);

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-club');                      //NEED TP DEFINE
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        //document.body.style.backgroundImage = 'none';
        return () => {
            document.body.classList.remove('body-club');      // cleanup lagbeii
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    // Filter events by the club title
    const clubEvents = eventsList.filter(event => event.organizer === clubTitle);

    return (
        <div className='eachClub'>
            <div className='eachClub-upper'>
                <div className='eachClub-upper-left'>
                    <h1>{club_info.title} ({club_info.abbreviation})</h1>
                    <h4>- {club_info.description}</h4>
                </div>
                <div className='eachClub-upper-right'>
                    <Link to="/clubs/club/join-club" className='JoinClubButton'>
                        <b>JOIN US</b>
                    </Link>
                </div>
            </div>
            <h2>Events Organized by {clubTitle}</h2>
            <div className="Info">
                <div className="InfoContent">
                    {clubEvents.map((event, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ContentPart">
                                <h3><strong>{event.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Date:</span> {event.tagline}</b></p>
                                    <Link to={`/events`} className="EventLinkButton">
                                        View Event
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Contact us at: {club_info.contactInformation}</h2>
        </div>
    );
}
 
export default EachClub 