import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../utils/FormatDate';
import { Link } from 'react-router-dom';
import ClubInfoSideBar from './ClubInfoSideBar';

export const ClubInfo = ({ clubData }) => {
    console.log(`ClubInfo te ashlam`);

    console.log(`CLUB ER INFO HEREEEE`,clubData.panel);

    const panelistMembers = clubData.panel;

    return (
        <div className="ClubData">
            <h1><span className='special-letter'>{clubData.title[0]}</span>{clubData.title.substring(1)} ({clubData.abbreviation})</h1>
            <h4> - {clubData.description}</h4>

            <div className='OuterLayer'>
                <div className='case1'>
                    <div className='heading'>
                        <h3>Current panel</h3>
                    </div>
                    <div className='PanelInfo'>
                        {panelistMembers.map((member, index) => (
                            <div className='EachPanelist' key={index}>
                                <p><strong>{member.name}</strong></p>
                                <p>{member.email}</p>
                            </div>
                        ))}
                    </div>
                    <h3>Club Advisors</h3>
                    <div className='AdvisorInfo'>
                        <div className='EachAdvisor'>
                            <p><strong> {clubData.advisor} </strong></p>
                        </div>
                    </div>
                    <h2 style={{ marginBottom: '50px' }}><FontAwesomeIcon icon={faMailBulk} style={{ fontSize: '2em' }} /> Club email: {clubData.contactInformation.email}</h2>
                </div>
                <div className='case2'>
                    {clubData && <ClubInfoSideBar clubData={clubData} />}
                </div>
            </div>
        </div>
    );
};

export default ClubInfo;
