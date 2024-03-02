import  { useEffect, useState } from 'react'



// Components
import {EventCard} from "../components/EventCard";
const Event = () => {

    // function changeBackgroundToHomePage() {
    //     document.body.classList.add('body-eventPage');
    //     return () => {
    //         document.body.classList.add('body'); 
    //     };
    // }
    // useEffect(changeBackgroundToHomePage, []);

    const [events, setEvents] = useState(null)
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch("/api/events/")
            const json = await response.json()

            if (response.ok){
                setEvents(json)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className= "event-page">
            <div className="events">
                {events && events.map((event) => (
                   <EventCard key={event._id} event ={event}/>
                ))
                }
            </div>
        </div>
    )
}

export default Event