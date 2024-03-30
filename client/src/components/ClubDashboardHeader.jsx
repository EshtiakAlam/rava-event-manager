import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const ClubDashBoardHeader = () => {
    return ( 
        <div className="clubDashboardHeader">
            <div className="clubDashboardHeaderLeft">
                <h1><span className='special-letter'>C</span>lub Dashboard</h1>
            </div>
            <div className="clubDashboardHeaderRight">
                    <FontAwesomeIcon icon={faBell} style={{ fontSize: '2em', marginRight: '15px' }} />
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '2em' }} />

            </div>
        </div> 
    )
}
 
export default ClubDashBoardHeader;