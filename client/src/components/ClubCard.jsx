import { Link } from "react-router-dom";

const ClubCard = ({club_info, events}) => {
    console.log(`Output:`, club_info);
    console.log(events);




    return (
        <div className='eachClub'>
            <div className='eachClub-upper'>
                <div className='eachClub-upper-left'>
                    <h1>{club_info.title} ({club_info.abbreviation})</h1>
                    <h4>- {club_info.description}</h4>
                </div>
                <div className='eachClub-upper-right'>
                    <Link to="/clubs/club/join-club" className='JoinClubButton'>
                        <b>JOIN US</b>
                    </Link>
                </div>
            </div>
            <h2>Events Organized by {club_info.title}</h2>
            <div className="Info">
                <div className="InfoContent">
                    {events && events.map((event, index) => (
                        <div className="EachInfo" key={index}>
                            <div className="ContentPart">
                                <h3><strong>{event.title}</strong></h3>
                                <div className="ContentPartSplit">
                                    <p><b><span className="special-letter">Date:</span> {event.tagline}</b></p>
                                    <Link to={`/clubs/${event._id}/events`} className="EventLinkButton">
                                        View Event
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Contact us at: {club_info.contactInformation}</h2>
        </div>
    );
}
 
export default ClubCard;