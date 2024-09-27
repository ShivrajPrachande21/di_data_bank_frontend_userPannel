import React, { useEffect } from 'react';
import './topus.css';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import CardCheck from '../../../../assets/images/CardCheck.png';

import { Button } from 'react-bootstrap';
import { useSubscription } from '../../../../context/SubscriptionContext';
const Topups = () => {
    const { fetch_top_ups, topUpData } = useSubscription();
    useEffect(() => {
        fetch_top_ups();
    }, []);
    return (
        <>
            <div className="top">
                <div className="sub-card">
                    {topUpData?.map((data, index) => (
                        <div className="top1" key={index}>
                            <p>{data?.plane_name}</p>
                            <h4 className="ruppee-topup">
                                <img
                                    src={Rupees1}
                                    alt=""
                                    width="17px"
                                    style={{ marginRight: '4px' }}
                                />
                                {data?.price}
                                <span>
                                    /
                                    {data?.search_limit != 'null'
                                        ? `${data?.search_limit}`
                                        : data?.cv_view_limit != 'null'
                                        ? `${data?.cv_view_limit}`
                                        : data?.job_posting != 'null'
                                        ? `${data?.job_posting}`
                                        : null}{' '}
                                    {data?.search_limit != 'null'
                                        ? `Search`
                                        : data?.cv_view_limit != 'null'
                                        ? `CV view`
                                        : data?.job_posting != 'null'
                                        ? `Job posting`
                                        : null}
                                </span>
                            </h4>
                            <Button
                                size="sm"
                                className="add-topup-btn"
                                style={{ background: '#19588C' }}
                            >
                                Add
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Topups;
