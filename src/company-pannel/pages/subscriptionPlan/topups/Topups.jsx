import React, { useEffect } from 'react';
import './topus.css';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import CardCheck from '../../../../assets/images/CardCheck.png';

import { Button,Modal } from 'react-bootstrap';
import { useSubscription } from '../../../../context/SubscriptionContext';
import Loader from '../../loader/Loader';
const Topups = () => {
    const { fetch_top_ups, topUpData, topup_initiatePayment, paymentLoading, modalShow,SetmodalShow,
        SubId,SetSubId} =
        useSubscription();
    useEffect(() => {
        fetch_top_ups();
    }, []);
    return (
        <>
            {paymentLoading ? (
                // <Spinner animation="border" variant="primary" />
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="top-1">
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
                                    {data?.search_limit != null&&data?.search_limit !=0
                                        ? `${data?.search_limit}`
                                        : data?.cv_view_limit != null &&data?.cv_view_limit != 0
                                        ? `${data?.cv_view_limit}`
                                        : data?.job_posting != null && data?.job_posting !=0
                                        ? `${data?.job_posting}`
                                        : null}{' '}
                                    {data?.search_limit != null&&data?.search_limit !=0
                                        ? `Search`
                                        : data?.cv_view_limit != null &&data?.cv_view_limit != 0
                                        ? `CV view`
                                        :  data?.job_posting != null && data?.job_posting !=0
                                        ? `Job posting`
                                        : null}
                                </span>
                            </h4>
                            <Button
                                size="sm"
                                className="add-topup-btn"
                                style={{ background: '#19588C' }}
                                onClick={() => topup_initiatePayment(data?._id)}
                            >
                                Add
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            {modalShow && (
              <Modal
              show={modalShow}
              size="sm" // Keep small size
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="compact-modal"
          >
              <Modal.Header closeButton style={{ padding: '0.5rem', borderBottom: 'none' }}>
                  <Modal.Title id="contained-modal-title-vcenter" className="text-center w-100">
                      <h6 className="text-success mb-0">🎉 Payment Successful!</h6>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0.5rem 1rem' }}>
                  <div className="text-center">
                      <p className="mb-1" style={{ fontSize: '0.8rem', color: '#6c757d' }}>Order ID:{SubId}</p>
                  </div>
              </Modal.Body>
              <Modal.Footer style={{ padding: '0.5rem', borderTop: 'none' }}>
                  <Button 
                    onClick={() => { SetmodalShow(false); SetSubId(''); }}
                      style={{ width: '100%', padding: '0.4rem 0', background: '#3B96E1', border: 'none', fontSize: '0.85rem' }}
                  >
                      OK
                  </Button>
              </Modal.Footer>
          </Modal>
            )}
        </>
    );
};

export default Topups;
