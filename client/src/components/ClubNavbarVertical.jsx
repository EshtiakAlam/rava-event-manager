import { Link } from 'react-router-dom';

export const ClubNavbarVertical = ({ showHomepageButton }) => {
    return (
        <header className='ClubNavbarVertical'>
            <div className="container">
                <Link to="">
                    <h1><img className="logo" src="/RAVA-white.png" alt="RAVA Logo" /></h1>
                </Link>
                <div className="navbarMid">
                    {showHomepageButton && (
                        <Link to="/club/clubdashboard">
                            <h1>Homepage</h1>
                        </Link>
                    )}
                    <Link to="/club/showclubevents">
                        <h1>Club Events</h1>
                    </Link>
                    <Link to="/club/eventrequestform">
                        <h1>Edit Info</h1>
                    </Link>
                    <Link to="/club/showVolunteers">
                        <h1>Volunteers</h1>
                    </Link>
                </div>
                <div className='navbarRight'>
                    <Link to="/club/calendar">
                        <h1>Calendar</h1>
                    </Link>
                    <Link to="/about">
                        <h1>About</h1>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default ClubNavbarVertical;
