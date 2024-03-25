import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

// pages & components
<<<<<<< HEAD
import AdminEvent from './pages/AdminEvent'
import AdminEventForm from './pages/AdminAddevents'


import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
=======
import Event from './pages/Event';
import EachEvent from './pages/EachEvent';
import { Home } from './pages/Home';

import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
>>>>>>> origin/shafi_events_working_5.0

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
<<<<<<< HEAD
                <Routes>
                        <Route
                            path="/admin/events"
                            element={<AdminEvent />}
                        />
                        <Route
                            path="/admin/eventform"
                            element={<AdminEventForm />}
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
                            path="/signupadmin"
                            element={<AdminSignup/>}
=======
                    <Routes> 
                        <Route 
                            path="/events" 
                            element={<Event />} 
                        />
                        <Route 
                            path="/events/:_id" 
                            element={<EachEvent />} 
                        />
                        <Route
                            path="/"
                            element={<Home />}
>>>>>>> origin/shafi_events_working_5.0
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
