import formatDate from "../utils/FormatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import  { useState, useEffect } from 'react';

export const EventKeyInfo = ({ event }) => {
    const [interestCount, setInterestCount] = useState(Number(event.interested));
    const [interestStatus, setInterestStatus] = useState(false);
    const [interestMsg, setInterestMsg] = useState("Interested in this event?");

    const handleClick = () => {
        if (!interestStatus) {
            setInterestCount(interestCount => interestCount+1); // functional update na korle hoy na update
            event.interested = interestCount;
            setInterestMsg(`You and ${interestCount} others are interested`);
        } else {
            setInterestCount(interestCount => interestCount-1);
            event.interested = interestCount;
            setInterestMsg("Interested in this event?");
        }
        setInterestStatus(!interestStatus);

        console.log(interestCount, interestStatus, event.interested);
    };

    useEffect(() => {
        console.log(interestCount, interestStatus, event.interested);
    }, [interestCount, interestStatus, event.interested]);

    return (
        <div className="EventKeyInfo">
            <button className="Interested" onClick={() => {handleClick()}}>{ interestMsg }</button>
            <p>Date</p>
            <p><strong>{ formatDate(event.date) }</strong></p>
            <p>Time</p>
            <p><strong>{ event.time }</strong></p>
            <p>Location</p>
            <p><strong>{ event.location }</strong></p>
            <p>Link</p>
            <div>
            <a href={ event.link } target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            </div>
        </div>
      );
}
 
export default EventKeyInfo;