import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Event from './pages/Event'
import {Home} from "./pages/Home"

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
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;