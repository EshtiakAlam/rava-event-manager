import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

// pages & components

import AdminEvent from './pages/AdminEvent';
import AdminEventForm from './pages/AdminAddEvents';


import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import ClubDashboard from './pages/ClubDashboard';


import Event from './pages/Event';
import EachEvent from './pages/EachEvent';
import AllClubs from './pages/AllClubs';
import EachClub from './pages/EachClub';
import JoinClub from './pages/JoinClub';
import { Home } from './pages/Home';
import ShowClubEvents from './pages/ShowClubEvents';
import ClubVolunteers from './pages/ClubVolunteers';
import UserCalendar from './pages/UserCalendar';




function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                <Routes>
                        <Route
                            path="/showVolunteers"
                            element={<ClubVolunteers />}
                        />
                        <Route
                            path="/showclubevents"
                            element={<ShowClubEvents />}
                        />
                        <Route
                            path="/join-club"
                            element={<JoinClub />}
                        />
                        
                        <Route
                            path="/clubs/:_id"
                            element={<EachClub />}
                        />
                        <Route
                            path="/clubs"
                            element={<AllClubs />}
                        />
                        <Route
                            path="/clubdashboard"               //pore login/clubdashboard banabo
                            element={< ClubDashboard/>}
                        />
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
                        />
                        <Route 
                            path="/events" 
                            element={<Event />} 
                        />
                        <Route 
                            path="/events/:_id" 
                            element={<EachEvent />} 
                        />
                        <Route 
                            path="/calendar" 
                            element={<UserCalendar/>} 
                        />
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
