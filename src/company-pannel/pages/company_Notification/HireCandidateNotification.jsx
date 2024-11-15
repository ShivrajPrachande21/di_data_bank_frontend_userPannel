import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import avatar from '../../../assets/images/avatar.png';
import { HireCandidateContext } from '../../../context/HireCandidateContex';
import BaseUrl from '../../../services/BaseUrl';
const HireCandidateNotification = () => {
    const { handleCloseHire, showHire, SetShowHire, candidateNoti } =
        useContext(HireCandidateContext);

    const bindUrlOrPath = url => {
        console.log('url', url);
        if (url) {
            let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
            let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
                /\\/g,
                '/'
            )}`;

            return temp.replace(/([^:]\/)\/+/g, '$1');
        }
    };
    return (
        <>
            <div
                className="hire-candidate-notification mt-2 d-flex align-items-center    p-2"
                style={{
                    borderRadius: '12px',
                    background: '#F8F8F8',
                    boxShadow: '0px 0px 12px 0px #a3a3a3'
                }}
            >
                <div className="candidate-img">
                    <Image
                        src={bindUrlOrPath(candidateNoti?.profile)}
                        alt="Profile"
                        roundedCircle
                        width={100}
                        height={100}
                    />
                </div>
                <div className="hire-content mx-4 d-flex">
                    <table style={{ marginRight: '40px' }}>
                        <tr>
                            <td>
                                Name:{' '}
                                <span style={{ color: '#AEAEAE' }}>
                                    {candidateNoti?.basic_details?.name}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:{' '}
                                <span>
                                    {' '}
                                    {candidateNoti?.basic_details?.email}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Mobile no:{' '}
                                <span>
                                    {' '}
                                    {candidateNoti?.basic_details?.mobile}
                                </span>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td>
                                LinkedIn url :{' '}
                                <span>
                                    {' '}
                                    {candidateNoti?.basic_details?.linkedIn}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {' '}
                                Location:{' '}
                                <span>
                                    {' '}
                                    {
                                        candidateNoti?.work_details
                                            ?.current_location
                                    }
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Designation:{' '}
                                <span>
                                    {
                                        candidateNoti?.personal_details
                                            ?.spouse_profession
                                    }
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <button>CLear ALl</button>
            </div>
        </>
    );
};

export default HireCandidateNotification;
