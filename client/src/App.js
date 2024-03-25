import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

// pages & components

import AdminEvent from './pages/AdminEvent'
import AdminEventForm from './pages/AdminAddEvents'


import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'

import Event from './pages/Event';
import EachEvent from './pages/EachEvent';
import { Home } from './pages/Home';




function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
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
