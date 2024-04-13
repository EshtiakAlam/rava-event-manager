import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

export const AllClubs = () => {

    const [clubs, setClubs] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            const response = await fetch("/api/clubs/");
            const json = await response.json();

            if (response.ok) {
                setClubs(json);
            }
        };

        fetchClubs();
    }, []);

    console.log(clubs);



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
                    {clubs && clubs.map((club, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ContentPart">
                                <h3><strong>{club.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Tagline:</span> { club.tagline }</b></p>
                                    <Link to={`/allclubs/${club._id}`}></Link>
                                    
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