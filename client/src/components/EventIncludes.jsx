import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const EventIncludes = ({ event }) => {
    return (
        <div className="EventIncludes">
            <h2>This event includes</h2>
            <div className="Info">
                {event.highlights.map((info, index) => (
                    <div className = "EachInfo" key={index}>
                        <FontAwesomeIcon icon={faStar} /><strong>  {info}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default EventIncludes