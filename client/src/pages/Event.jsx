import  { useEffect, useState } from 'react'
// Components
import {EventCard} from "../components/EventCard";


const Event = () => {
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

    function changeBackgroundToHomePage() {
        document.body.classList.add('body-event');
        return () => {
            document.body.classList.add('body'); 
        };
    }

    useEffect(changeBackgroundToHomePage, []);

    return (
        <div className= "event-page">
            <div className="events">
                {events && events.map((event) => (
                    <div>
                   <EventCard key={event._id} event ={event}/>
                   </div>
                ))
                }
            </div>
        </div>
    )
}

export default Event