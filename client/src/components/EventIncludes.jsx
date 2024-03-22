import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const EventIncludes = ({ event }) => {
    return (
        <div className="EventIncludes">
            <h2>This event includes</h2>
            <div className="Info">
                {event.info.map((info, index) => (
                    <div key={index}><FontAwesomeIcon icon={faStar} />{info}</div>
                ))}
            </div>
        </div>
    );
}
 
export default EventIncludes