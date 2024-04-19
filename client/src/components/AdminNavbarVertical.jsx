import { Link } from 'react-router-dom';
import { useAdminLogout } from "../hooks/useAdminLogout";
import { useAdminAuthContext } from '../hooks/useAdminAuthContext';

export const AdminNavbarVertical = ({ clubId, showHomepageButton }) => {
    const { logout } = useAdminLogout();
    const { admin } = useAdminAuthContext();
    const handleClick = () => {
        logout();
    };
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
                    
                </div>
                <div className='navbarRight'>
                <Link to="/about">
                        <h1>About</h1>
                </Link>
                {!admin && (
                        <>
                            
                            <Link to="/admin/login">
                                <h1>Login</h1>
                            </Link>
                        </>
                    )}
                    {admin && (
                        <div className="user-info">
                            <span>{admin.email}</span>
                            <button onClick={handleClick}>Log out </button>
                        </div>
                    )}
                    
                </div>
            </div>
        </header>
    );
};

export default AdminNavbarVertical;
