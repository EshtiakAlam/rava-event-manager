import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminEvent from './pages/AdminEvent';
import AdminEventForm from './pages/AdminAddEvents';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Event from './pages/Event';
import EachEvent from './pages/EachEvent';
import { Home } from './pages/Home';
import { useAuthContext } from './hooks/useAuthContext';
import { useAdminAuthContext } from './hooks/useAdminAuthContext';

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
                        <Route path="/admin/events" element={admin ? <AdminEvent /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/eventform" element={admin ? <AdminEventForm /> : <Navigate to="/admin/login" />} />
                        <Route path="/admin/login" element={!admin ? <AdminLogin /> : <Navigate to="/admin/events" />} />
                        <Route path="/admin/signup" element={!admin ? <AdminSignup /> : <Navigate to="/admin/events" />} />

                        {/* Routes for user */}
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/events" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/events" />} />
                        <Route path="/events" element={user ? <Event /> : <Navigate to="/login" />} />
                        <Route path="/events/:_id" element={<EachEvent />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
