
import { Link } from 'react-router-dom'
import {useLogout} from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext'
export const Navbar = () => {
    const {logout} = useLogout()
    const {user } = useAuthContext()
    const handleClick = ()=>{
        logout()
    }
    return (
        <header className='Navbar'>
            <div className="container">
                <Link to="">
                <h1><img className="logo" src="/rava-black.png" alt="RAVA Logo" /></h1>
                </Link>
                <div className="navbarMid">
                    <Link to="/events">
                        <h1>Events</h1>
                    </Link>
                    <Link to="">
                        <h1>Calendar</h1>
                    </Link>
                    <Link to="">
                        <h1>About</h1>
                    </Link>
                </div>
                <div className='navbarRight'>
                    {!user &&(
                        <>
                    <Link to="/signup">
                        <h1>Sign up</h1>
                    </Link>
                    <Link to="/login">
                        <h1>Login</h1>
                    </Link>
                    </>)}
                    {user && (
                    <div className="user-info">
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log out </button>
                    </div>
                    )} 
                </div>

        </div>
      </header>
  )
}

export default Navbar