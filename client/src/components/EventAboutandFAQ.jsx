import  { useEffect, useState } from 'react'

export const EventAboutandFAQ = ({ event }) => {

    const [isReadMore, toggleReadMore] = useState(false);

    // const useEffect(() => , [isReadMore]);                   // TO BE FINISHED

    return ( 
        <div className="EventAboutandFAQ">
            <div className="About">
                <h2><strong>About the event</strong></h2>
                <p><b>{ event.description }</b></p>
                <button onClick={() => toggleReadMore()}>Read More</button>
            </div>
            <div className="Info">
                <h2><strong>Frequently Asked Questions (FAQs)</strong></h2>
                {event.faq.map((faq, index) => (
                    <div className="faq" key={index}>
                        {faq}
                        <button onClick={() => toggleReadMore()}>Read More</button>
                    </div>
                    
                ))}
            </div>
        </div>
     );
}
 
export default EventAboutandFAQ;