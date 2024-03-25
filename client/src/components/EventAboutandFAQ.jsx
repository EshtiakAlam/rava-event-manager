import {CollapseableText} from "../components/CollapseableText";
import EventPostQuery from "./EventPostQuery";


export const EventAboutandFAQ = ({ event }) => {

    return ( 
        <div className="EventAboutandFAQ">
            <div className="About">
                <h2><strong>About the event</strong></h2>
                <p><b>{ event.description }</b></p>
                <CollapseableText key={event._id} shortText={event.description.substring(0, 50)} longText={event.description} />
                
            </div>
            <div className="Info">
                <h2><strong>Frequently Asked Questions (FAQs)</strong></h2>
                {event.faq.map((faq, index) => (
                    <div className="faq" key={index}>
                        <CollapseableText key={faq._index} shortText={faq.substring(0, 50)} longText={faq} />
                    </div>
                    
                ))}
            </div>
            <div className="PostQueries">
                <EventPostQuery key={event._id} event={event} />
            </div>
        </div>
     );
}
 
export default EventAboutandFAQ;