import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="">
          <h1><img className="logo" src="/rava-black.png" alt="RAVA Logo" /></h1>
        </Link>
        <div className="nav-links">
          <Link to="/events">
            <h1>Events</h1>
          </Link>
          <Link to="">
            <h1>Calendar</h1>
          </Link>
          <Link to="/login">
            <h1>Log in</h1>
          </Link>
          <div>
            <button className="logout-button" onClick={handleClick}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
