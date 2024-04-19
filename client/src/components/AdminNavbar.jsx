import { Link } from 'react-router-dom';
import { useAdminLogout } from "../hooks/useAdminLogout";
import { useAdminAuthContext } from '../hooks/useAdminAuthContext';

export const AdminNavbar = () => {
    const { logout } = useAdminLogout();
    const { admin } = useAdminAuthContext();
    

    const handleClick = () => {
        logout();
    };

    return (
        <header className='Navbar'>
            <div className="container">
                <Link to="">
                    <h1><img className="logo" src="/rava-black.png" alt="RAVA Logo" /></h1>
                </Link>
                <div className="navbarMid">
                    <Link to="/admin/events">
                        <h1>Events</h1>
                    </Link>
                    <Link to="/clubdashboards">
                        <h1>Club Dashboards</h1>
                    </Link>
                </div>
                <div className='navbarRight'>
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

export default AdminNavbar;
