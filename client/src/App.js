import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Event from './pages/Event'
import {Home} from "./pages/Home"

import Navbar from './components/Navbar'
import EventCard from './components/EventCard';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                <Routes>
                    <Route
                        path="/events"
                        element={<Event />}
                    />
                    {/* <Route
                        path="/"
                        element={<Home />}
                    /> */}
                </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;