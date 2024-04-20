import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import { faQuoteLeft, faQuoteRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const About = () => {
    const founders = ['Eshtiak Shihab', 'Shamsur Shafi', 'Israr Karim', 'Maruf Islam'];
    // Remove the founders_images array as we will use the user icon instead
    const [selectedPersonIndex, setSelectedPersonIndex] = useState(-1);
    const [introText, setIntroText] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Add or remove classes for background and navbar as needed
        document.body.classList.remove('body-home');
        document.body.classList.add('body-about');
        return () => {
            document.body.classList.remove('body-about');
        };
    }, []);

    useEffect(() => {
        // Simulating the effect of writing text letter by letter
        const textContent = `A  journey that started off in February, 2024. The inspiration primarily drew from acknowledging
                            the hardships faced by individuals at BRAC about club involvement. The club culture on the 
                            premises has long been thriving and bustling. 
                            They have been harboring a diverse spectrum of passions. The status quo, however, demanded
                            a platform that could streamline all the processing tasks for club participants, club leaders, and 
                            the university administration panel itself.
                            <br>
                            RAVA stands firm today on a mission to be the most reliable platform to unite the student community
                            in BRAC. 
                            <br>
                            <br>
                            The journey has only begun and we welcome you to our close-knit community!`;

        let index = 0;
        const interval = setInterval(() => {
            if (index < textContent.length) {
                setIntroText(prevText => prevText + textContent.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    const handlePersonHover = (index) => {
        setSelectedPersonIndex(index);
    };

    const handleMouseLeave = () => {
        setSelectedPersonIndex(-1); // Reset selected index when mouse leaves card-container
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission here (e.g., post email content to the database)
        console.log('Email submitted:', email);
        // Refresh the page after submission
        window.location.reload();
    };

    return (
        <div className="about-container">
            <div className='Intro'>
                <h1 className='neon'>Welcome to RAVA</h1>
                <p dangerouslySetInnerHTML={{ __html: introText }}></p>
            </div>

            <div className='AboutMid1'>
                <h1>KNOW WHAT'S HAPPENING ON CAMPUS</h1>
                <div className='content'>
                    <p></p>
                </div>
            </div>

            <div className='AboutMid2'>
                <h1>FOLLOW WHERE YOUR ENTHUSIASM LEADS</h1>
                <div className='content'>
                    <p></p>
                </div>
            </div>

            <div className='AboutMid3'>
                <h1>HOST YOUR OWN EVENT TODAY</h1>
                <div className='content'>
                    <p></p>
                </div>
            </div>

            <div className='AboutMid4'>
                <h1>CLUB MAINTENANCE LIKE NEVER BEFORE</h1>
                <div className='content'>
                    <p></p>
                </div>
            </div>

            <div className='Anecdotes-container'>
                <div className='Anecdotes-cloud'>
                    <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "black" }} />
                    <p>
                        Participant and volunteer management prior to events used to be one of the most hectic aspects.
                        Thankfully all that has now become one click away.
                    </p>
                    <FontAwesomeIcon icon={faQuoteRight} style={{ marginLeft: "95%", color: "black" }} />
                </div>

                <div className='Anecdotes-cloud'>
                    <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "black" }} />
                    <p>
                        With so many different Facebook pages it was difficult for me to keep track of upcoming events.
                        RAVA has been my reliable personal assistant in that regard.
                    </p>
                    <FontAwesomeIcon icon={faQuoteRight} style={{ marginLeft: "95%", color: "black" }} />
                </div>
            </div>

            <div className='Founders'>
                <h1>Meet the Team</h1>
                <div
                    className='card-container'
                    onMouseLeave={handleMouseLeave}
                >
                    {founders.map((founder, index) => (
                        <div
                            className={`Person ${index === selectedPersonIndex ? 'selected' : ''}`}
                            key={index}
                            onMouseEnter={() => handlePersonHover(index)}
                            style={{ animationDelay: `${index * 0.5}s` }}
                        >
                            <div className='PersonContent'>
                                <div className='FounderPic'>
                                    <FontAwesomeIcon icon={faUser} size="2x" style={{ color: "white" }} />
                                </div>
                                <h2>{founder}</h2>
                                <h3>BRAC University</h3>
                                <h5>CSE Department</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='Outro' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='Newsletter'>
                    <div className='PostQueries1'>
                        <h1>Subscribe to our newsletter for monthly bursts!</h1>
                        <form className="Query" onSubmit={handleSubmit}> {/* Update to handle form submission */}
                            <textarea
                                className="text-box"
                                rows="1"
                                cols="50"
                                placeholder="Enter your email here"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />

                            <button type="submit" style={{ marginLeft: '10px' }}>
                                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '30px' }} />
                            </button>
                        </form>
                    </div>
                </div>
                <div className='Contacts'>
                    <h1>Contact us</h1>
                    <div className="contact-icons">
                        <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: '30px', marginRight: '10px' }} />
                        <FontAwesomeIcon icon={faInstagramSquare} style={{ fontSize: '30px', marginRight: '10px' }} />
                        <FontAwesomeIcon icon={faTwitterSquare} style={{ fontSize: '30px', marginRight: '10px' }} />
                        <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '30px', marginRight: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
