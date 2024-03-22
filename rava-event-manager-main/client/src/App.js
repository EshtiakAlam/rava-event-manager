import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Event from './pages/Event'
import {Home} from "./pages/Home"
import React from 'react';
import AboutUs from 'client\src\pages\aboutus.jsx';
import Navbar from './components/Navbar'

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
                        <Route path="/aboutus"
                               element={<aboutus />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;