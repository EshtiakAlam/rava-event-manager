
import React from 'react';

// pages & components
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AdminEvent from './pages/AdminEvent';
import AdminEventForm from './pages/AdminAddEvents';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';

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
import { useAuthContext } from './hooks/useAuthContext';
import { useAdminAuthContext } from './hooks/useAdminAuthContext';
import ClubLogin from './components/clublogin';
import ClubSignup from './components/clubSignup';
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
    const { user } = useAuthContext();
    const { admin } = useAdminAuthContext();
    const isAdmin = window.location.pathname.startsWith('/admin');

    return (
        <div className="App">
            <BrowserRouter>
                {isAdmin ? <AdminNavbar /> : <Navbar />}
                <div className="pages">
                    <Routes>
                        {/* Routes for admin */}
                        <Route path="/admin" element={admin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/events" element={admin ? <AdminEvent /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/eventform" element={admin ? <AdminEventForm /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/login" element={!admin ? <AdminLogin /> : <Navigate to="/admin/events" />} />
                        <Route path="/admin/signup" element={!admin ? <AdminSignup /> : <Navigate to="/admin/events" />} />
                        <Route path="/admin/addLogistics/" element={admin ? <AdminAddLogistics />: <Navigate to="/admin/login" />} />
                        <Route path="/admin/editLogistic/:item/:_id" element={admin ? <AdminEditLogistics />: <Navigate to="/admin/login" />}  />
                        <Route path="/admin/logistics" element={admin ? <AdminLogistics /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/event/:_id" element={admin ? <AdminViewEvent /> : <Navigate to="/admin/login" />} />

                        {/* Routes for user */}
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/events" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/events" />} />
                        <Route path="/events" element={user ? <Event /> : <Navigate to="/login" />} />
                        <Route path="/allclubs" element={user ? <AllClubs /> : <Navigate to="/login" />} />
                        <Route path="/calendar" element={user ? <UserCalendar/> : <Navigate to="/login" />} />
                        <Route path="/allclubs/:_id" element={<EachClub />}/>
                        <Route path="/events/:_id" element={<EachEvent />} />
                        <Route path="/join-club" element={<JoinClub />} />

                         {/* Route for club login */}
                        <Route path="/club/login" element={<ClubLogin />} />
                        <Route path="/club/signup" element={<ClubSignup />} />
                        <Route path="/club/addLogistics/:_id" element={<ClubAddLogistics />} />
                        <Route path="/club/addVolunteer/:_id" element={<ClubAddVolunteer />} />
                        <Route path="/club/showVolunteers/:_id" element={<ClubVolunteers />} />
                        <Route path="/club/showLogistics/:_id" element={<ClubLogistics />} />
                        <Route path="/club/showclubevents/addEvent/:_id" element={<ClubAddEvent />}/>
                        <Route path="/club/edit/event/:_id" element={<ClubEditEvent />} />
                        <Route path="/club/showclubevents/:_id" element={<ShowClubEvents />} />
                        <Route path="/club/edit/:_id" element={<UpdateClubData />} />
                        <Route path="/club" element={<ClubDashboard/>} />

                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <BottomBar />
            </BrowserRouter>
        </div>
    );
}

export default App;
