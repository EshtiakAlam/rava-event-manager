import { Link } from 'react-router-dom';

export const AdminNavbarVertical = ({ clubId, showHomepageButton }) => {
    console.log(`Passed to Navbar`, clubId, showHomepageButton);

    console.log(`At ClubVerticalNavbar:`, clubId, showHomepageButton);

    return (
        <header className='ClubNavbarVertical'>
            <div className="container">
                <Link to="">
                    <h1><img className="logo" src="/RAVA-white.png" alt="RAVA Logo" /></h1>
                </Link>
                <div className="navbarMid">
                    {showHomepageButton && (
                        <Link to="/admin/">
                            <h1>Homepage</h1>
                        </Link>
                    )}
                    <Link to={`/admin/events`}>               
                        {/* Dynamic kisui na */}
                        <h1>Events</h1>
                    </Link>
                    <Link to={`/admin/logistics/`}>
                        <h1>Logistics</h1>
                    </Link>
                    <Link to={`/admin/showAdminVolunteers`}>
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

export default AdminNavbarVertical;
