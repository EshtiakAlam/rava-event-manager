
import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="">
                <h1><img className="logo" src="/rava-black.png" alt="RAVA Logo" /></h1>
                </Link>
                <div className="nav-links">
                    <Link to="">
                        <h1>Events</h1>
                    </Link>
                    <Link to="">
                        <h1>Calendar</h1>
                    </Link>
                    <Link to="">
                        <h1>About</h1>
                    </Link>
                </div>

            </div>
        </header>
    )
}

export default Navbar