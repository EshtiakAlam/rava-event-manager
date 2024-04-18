
import { Link } from 'react-router-dom'
export const BottomBar = () => {
    return (
        <header className='BottomBar'>
            <div className="container">
                <Link to="">
                    <h1><img className="logo" src="/RAVA-white.png" alt="RAVA Logo" /></h1>
                </Link>
                
                <div className='bottomBarRight'>
                    <Link to="/about">
                        <h1>About</h1>
                    </Link>
                    <Link to="/to_add">
                        <h1>Club Login</h1>
                    </Link>
                    <Link to="/to_be_added">
                        <h1>Admin Login</h1>
                    </Link>
                </div>

        </div>
      </header>
  )
}

export default BottomBar