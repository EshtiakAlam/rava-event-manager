import formatDate from "../utils/FormatDate";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Event = () => {
    const { user } = useAuthContext();
    const [events, setEvents] = useState(null);
    const [thisMonthEvents, setThisMonthEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
        if (user) {
        fetchEvents();
        }
    }, [user]);

    const fetchEvents = async () => {
        try {
          const response = await fetch("/api/events/approved/", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },      
          });
          const json = await response.json();

          if (response.ok) {
            setEvents(json);
          }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    console.log(`All events ki ki:`, events);

    function changeBackgroundToHomePage(){
        document.body.classList.add('body-event-main');
        document.querySelector('.Navbar').classList.add('BlackNavbar');
        return () => {
            document.body.classList.remove('body-event-main');      // cleanup lagbeii
            document.querySelector('.Navbar').classList.remove('BlackNavbar');
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    useEffect(() => {
        if (events) {
            const currentDate = new Date();
            const thisMonth = currentDate.getMonth();
            const thisYear = currentDate.getFullYear();

            const thisMonthEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
            });

            const futureEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > currentDate && (eventDate.getMonth() !== thisMonth || eventDate.getFullYear() !== thisYear);
            });

            // Sort
            thisMonthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Update
            setThisMonthEvents(thisMonthEvents);
            setFutureEvents(futureEvents);
        }
    }, [events]);

    console.log(`Ekhane asi`);
    console.log(`Kaj ki korse?:`, thisMonthEvents, futureEvents);

  return (
      <div className="event-page">
          <div className='Upperpart'>
              <h1><strong>DON'T MISS OUT</strong></h1>
              <h4>Discover events around your campus</h4>
          </div>
          {!isLoggedIn && (
              <p>
                  You must be logged in to view events. Please{" "}
                  <Link to="/login">login</Link>.
              </p>
          )}

          {isLoggedIn && (
              <>
                  <h2><span className="special-letter">THIS MONTH</span></h2>
                  <div className="Info">
                      <div className="InfoContent">
                          {thisMonthEvents && thisMonthEvents.length > 0 ? (
                              thisMonthEvents.map((event, index) => (
                                  <div className="EachInfo" key={index}>
                                      <div className="ImagePart"></div>
                                      <div className="ContentPart">
                                          <h3><strong>{event.title}</strong></h3>
                                          <div className="ContentPartSplit">
                                              <p><b><span className="special-letter">Date:</span> {formatDate(event.date)}</b></p>
                                              <Link to={`/events/${event._id}`}></Link>
                                          </div>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <div className="NothingToShow">
                                  No events to show
                              </div>
                          )}
                      </div>
                  </div>

                  <h2><span className="special-letter">UPCOMING EVENTS</span></h2>
                  <div className="Info">
                      <div className="InfoContent">
                          {futureEvents && futureEvents.length > 0 ? (
                              futureEvents.map((event, index) => (
                                  <div className="EachInfo" key={index}>
                                      <div className="ImagePart"></div>
                                      <div className="ContentPart">
                                          <h3><strong>{event.title}</strong></h3>
                                          <div className="ContentPartSplit">
                                              <p><b><span className="special-letter">Date:</span> {formatDate(event.date)}</b></p>
                                              <Link to={`/events/${event._id}`}></Link>
                                          </div>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <div className="NothingToShow">
                                  No events to show
                              </div>
                          )}
                      </div>
                  </div>
              </>
          )};
      </div>
  );


};

export default Event;
