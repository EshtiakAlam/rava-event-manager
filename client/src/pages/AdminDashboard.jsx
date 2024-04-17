import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbarVertical from "../components/AdminNavbarVertical";
import AdminDashBoardHeader from "../components/AdminDashboardHeader";

const AdminDashboard = () => {
    useEffect(() => {
        // Remove the Navbar component from the DOM when ClubDashboard mounts
        const navbarElement = document.querySelector('.Navbar');
        if (navbarElement) {
            navbarElement.style.display = 'none';
        }

        const bottomBarElement = document.querySelector('.BottomBar');
        if (bottomBarElement) {
            bottomBarElement.style.display = 'none';
        }
        
        // Show the Navbar component again when ClubDashboard unmounts
        return () => {
            if (navbarElement) {
                navbarElement.style.display = 'block';
                bottomBarElement.style.display = 'block';
            }
        };
    }, []);

    return ( 
        <div className="AdminDashboard">
            <AdminNavbarVertical />
            <AdminDashBoardHeader />

            <h1 className="extra">
                <span className="special-letter">WELCOME</span> Admin
            </h1>

            <div className="admin-buttons1">
                <h2>Review Event Requests</h2>
                <Link to="/admin/events" className="admin-button">
                    Events
                </Link>
            </div>
            <div className="admin-buttons2">
                <h2>Review Logistics Requests</h2>
                <Link to="/admin/logistics" className="admin-button">
                    Logistics
                </Link>
            </div>
        </div> 
    );
}
 
export default AdminDashboard;
