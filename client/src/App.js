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
import About from './pages/About';
import BottomBar from './components/BottomBar';
import ClubAddVolunteer from './pages/ClubAddVolunteer';
import ClubAddEvent from './pages/ClubAddEvent';
import ClubEditEvent from './pages/ClubEditEvent';
import UpdateClubData from './pages/UpdateClubData';
import ClubLogistics from './pages/ClubLogistics';
import ClubAddLogistics from './pages/ClubAddLogistics';
import AdminDashboard from './pages/AdminDashboard';
import AdminViewEvent from './pages/AdminViewEvent';
import AdminLogistics from './pages/AdminLogistics';
import AdminEditLogistics from './pages/AdminEditLogistics';
import AdminAddLogistics from './pages/AdminAddLogistics';




function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                <Routes>
                        <Route            
                            path="/admin/addLogistics/"
                            element={<AdminAddLogistics />}
                        />
                        <Route            
                            path="/admin/editLogistic/:item/:_id"
                            element={<AdminEditLogistics />}
                        />
                        <Route            
                            path="/admin/logistics"
                            element={<AdminLogistics />}
                        />
                        <Route            
                            path="/admin/event/:_id"
                            element={<AdminViewEvent />}
                        />
                        <Route            
                            path="/admin"
                            element={<AdminDashboard />}
                        />
                        <Route            
                            path="/club/addLogistics/:_id"
                            element={<ClubAddLogistics />}
                        />
                        <Route      
                            path="/club/addVolunteer/:_id"
                            element={<ClubAddVolunteer />}
                        />
                        <Route
                            path="/club/showVolunteers/:_id"
                            element={<ClubVolunteers />}
                        />
                        <Route      
                            path="/club/showLogistics/:_id"
                            element={<ClubLogistics />}
                        />
                        <Route      
                            path="/club/showclubevents/addEvent/:_id"
                            element={<ClubAddEvent />}
                        />
                        <Route      
                            path="/club/edit/event/:_id"
                            element={<ClubEditEvent />}
                        />
                        <Route
                            path="/club/showclubevents/:_id"
                            element={<ShowClubEvents />}
                        />
                        <Route
                            path="/club/edit/:_id"
                            element={<UpdateClubData />}
                        />
                        <Route
                            path="/club/clubdashboard"               //pore login/clubdashboard banabo
                            element={<ClubDashboard/>}
                        />
                        <Route
                            path="/admin/events"
                            element={<AdminEvent />}
                        />
                        <Route
                            path="/admin/addEvent"
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
                            path="/join-club"
                            element={<JoinClub />}
                        />
                        <Route
                            path="/allclubs/:_id"
                            element={<EachClub />}
                        />
                        <Route
                            path="/allclubs"
                            element={<AllClubs />}
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
                            path="/about"
                            element={<About />}
                        />
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Routes>
                </div>
                <BottomBar />
            </BrowserRouter>
        </div>
    );
}

export default App;
