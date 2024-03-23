import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Event from './pages/Event'
import EventForm from './pages/Addevents'
import Home from "./pages/Home"


import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import Welcome from './pages/Welcome'
import AboutUs from './pages/AboutUs'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route path="/"
                               element={<Home/> }/>
                        <Route
                            path="/events"
                            element={<Event />}
                        />
                        <Route
                            path="/eventform"
                            element={<EventForm />}
                        />
                        <Route
                            path="/login"
                            element={<Login/>}
                        />
                        <Route
                            path="/loginadmin"
                            element={< AdminLogin/>}
                        />
                        <Route
                            path="/signup"
                            element={<Signup/>}
                        />
                          <Route
                            path="/aboutus"
                            element={<AboutUs/>}
                        />
                        <Route
                            path="/signupadmin"
                            element={<AdminSignup/>}
                        />
                        <Route
                            path="/home"
                            element={<Home/>}
                        />
                        <Route
                            path="/welcome"
                            element={<Welcome/>}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;