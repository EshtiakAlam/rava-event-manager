import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

export const AllClubs = () => {
    const clubList = [
        {"title": 'BRAC University Robotics Club', 'tagline': "Robo Nerd Hub"},
        {"title": 'BRAC University Computer Club', 'tagline': "Computer Enthusaist Hub"},
        {"title": 'BRAC University Business Club', 'tagline': "Entrepreneurrr It"},
        {"title": 'BRAC University Football Club', 'tagline': "Khelbo Lorbo Jitbo"}
    ]

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-club-main');                      //NEED TP DEFINE
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        //document.body.style.backgroundImage = 'none';
        return () => {
            document.body.classList.remove('body-club-main');      // cleanup lagbeii
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
        };
    }

    useEffect(changeBackgroundToHomePage, []);


    return (
        <div className="club-page">
            <div className='Upperpart'>
                    <h1><strong>BRACU CLUBS</strong></h1>
                    <h4>FIND WHERE YOU BELONG</h4>
            </div>

            <h2><span class="special-letter">E</span>XPLORE</h2>
            <div className="Info">
                <div className = "InfoContent">
                    {clubList.map((club, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ContentPart">
                                <h3><strong>{club.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Tagline:</span> { club.tagline }</b></p>
                                    <Link to={`/clubs/club`}></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default AllClubs