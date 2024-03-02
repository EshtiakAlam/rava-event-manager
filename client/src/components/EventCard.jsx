import formatDate from "../utils/FormatDate";
import { FaFacebook } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';

export const EventCard = ({ event }) => {

    const likes = event.interested;

    const ButtonComponent = () => {
        const [isInterested, setIsInterested] = useState(true);
        
        const handleClick = () => {
            setIsInterested(!isInterested); // Toggle 
        };

        return (
            <button className="InterestedButton" onClick={handleClick}>
                {isInterested ? `Interested count: ${likes}` : 'Interested'}
            </button>
        );
    };





    return (
        <header className= "EventCard">
            <div className="eventCardImage">
                <h1><img src="/eventsonlyimage.png" alt="eventcardimage" style={{width: '1225px', height: 'auto'}}></img></h1>
            </div>

            <div className="event-card-top">
                <div className="event-card-left-top">
                    <h4>{event.title}</h4>
                    <p className="clubIcon">
                        <FaUserCircle size={32} color="orange" marginRight="5px"/>
                        <a href="www.clublink.com"><strong>{event.organizer}</strong></a>
                    </p>
                    <br></br>
                    <h2>This event includes</h2>
                    <div className="eventInfo">
                        {event.info.map((item, index) => (
                            <p key={index}><FaStar style={{color:"orange"}}/>{item}</p>
                        ))}
                    </div>
                </div>
                
                <div className="event-card-right-top">
                    <ButtonComponent /> {/* Render ButtonComponent here */}
                    <p className="label">Date</p>
                    <p><strong>{formatDate(event.date)}</strong></p>
                    <p className="label">Time</p>
                    <p><strong>{event.time}</strong></p>
                    <p className="label">Location</p>
                    <p><strong>{event.location}</strong></p>
                    <p className="label">Link</p>
                    <p><a href={event.link}><FaFacebook /></a></p>
                </div>
            </div>
            
            <div className="About">
                <h2 className="AboutLabel">About:</h2>
                <p className="AboutInfo">{event.description}</p>
            </div>

            <div className="FAQ">
                <h2 className="FAQLabel">Frequently Asked Questions</h2>
                <p>Get your event queries answered here</p>
                <h3 className="queries">Who can participate?</h3><button className="readMoreButton">Read More</button>
                <h3 className="queries">What are pre-requisites?</h3><button className="readMoreButton">Read More</button>
                <h3 className="queries">Can I interact with host></h3><button className="readMoreButton">Read More</button>
            </div>
            
            <div className="PostQuery">
            <h2 className="QueryLabel1">Don't find the question you looking for? <strong>Post Your Question</strong></h2>
            <form>
                <textarea>
                    placeholder="Content"
                    value={content}
                </textarea>
            </form>
            </div>

        </header>
    );
};

export default EventCard