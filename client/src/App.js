import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import AdminEvent from './pages/AdminEvent'
import AdminEventForm from './pages/AdminAddevents'


import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'

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
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;