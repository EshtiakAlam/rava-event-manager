import { CollapseableText } from "../components/CollapseableText";
import EventDeadline from "./EventDeadline";
import EventPostQuery from "./EventPostQuery";

export const EventAboutandFAQ = ({ event }) => {

    return (
        <div className="EventAboutandFAQ">
            <div className="About">
                <div className="layer1">
                    <h2><strong>About the event</strong></h2>
                    <p><b>{ event.description }</b></p>
                </div>
                <div className="layer2">
                    <EventDeadline event = {event} />
                </div>
            </div>
            <div className="Info">
                <h2><strong>Frequently Asked Questions (FAQs)</strong></h2>
                {event.FAQ.map((faq, index) => (
                    <div className="faq" key={faq._id}>
                        <p><strong>{faq.question}</strong></p>
                        <CollapseableText key={index + '-answer'} shortText={faq.answer.substring(0, 50)} longText={faq.answer} />
                    </div>
                ))}
            </div>
            <div className="PostQueries">
                <EventPostQuery key={event._id} event={event} />
            </div>
        </div>
    );
}
