import React, { useEffect, useState } from 'react';
import './cerdibility.css';
import { Col, Form, Pagination, Row, Spinner, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import carbon_send from '../../../assets/images/carbon_send.png';
import Speedometer from './speedometer';
import arrowdown from '../../../assets/images/arrowdown.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from './../../../services/BaseUrl';
import { set } from 'date-fns';
import { toast } from 'react-toastify';
const CredibilityEstablishment = () => {
    const [CredibilityData, setCredibilityData] = useState(null);
    const [PAN, setPAN] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectValue, setselectValue] = useState(itemsPerPage);

    const handleSelect = e => {
        const value = parseInt(e.target.value, 10);
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when items per page change
    };

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };
    const validatePAN = pan => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };
    const handleTextChange = e => {
        setPAN(e.target.value);

        if (e.target.value == '') {
            setErrorMessage('');
        } else if (validatePAN(e.target.value)) {
            setErrorMessage('');
        } else {
            setErrorMessage('PAN number format is invalid.');
        }
    };

    const getSubscriptionStatus = async () => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/credibility/status/${cmpId}`
                );

                setSubscription(response?.data);
            } catch (error) {}
        }
    };

    const fetchCeridibilityDetails = async () => {
        setLoading(true);
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/offer_verifier/${companyId}/${PAN}`
                );
                setCredibilityData(response?.data);
                if (response.status == 200 || response.status == 201) {
                    setLoading(false);
                }
            } catch (error) {
                toast.error(`${error?.response?.data?.error}`);
                setCredibilityData(null);
                setLoading(false);
            }
        }
    };

    const isTransactionDataArray = Array.isArray(
        CredibilityData?.data[0]?.offers
    );

    // Fallback to an empty array if transactionData is not an array
    const validTransactionData = isTransactionDataArray
        ? CredibilityData?.data[0]?.offers
        : [];
    const totalItems = validTransactionData.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current items based on pagination
    const currentItems = validTransactionData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    useEffect(() => {
        getSubscriptionStatus();
    }, []);
    return (
        <div className="CredibilityEstablishment">
            <div className="cerdibility-search">
                <div className="c-search">
                    <p>Track Offer letters</p>
                    <div className="seacrhbar">
                        <Form.Control
                            width="20%"
                            placeholder="Search by PAN No. "
                            name="PAN"
                            value={PAN}
                            onChange={e => handleTextChange(e)}
                            className={errorMessage ? 'is-invalid' : ''}
                        />

                        {loading ? (
                            <Button
                                size="sm"
                                onClick={fetchCeridibilityDetails}
                            >
                                <Spinner animation="border" size="sm" />
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={fetchCeridibilityDetails}
                            >
                                <img src={carbon_send} alt="" />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="accpeted-rejected">
                    <p className="text-success">
                        Accepted :{' '}
                        {CredibilityData?.data[0]?.acceptedCount || 0}
                    </p>
                    <span></span>
                    <p className="text-danger">
                        Rejected :{' '}
                        {CredibilityData?.data[0]?.rejectedCount || 0}{' '}
                    </p>
                    <span></span>
                    <p className="text-warning">
                        Pending :{' '}
                        {CredibilityData?.data[0]?.acceptedCount -
                            CredibilityData?.data[0]?.offersCount || 0}
                    </p>
                </div>
            </div>

            <p
                className="cerdibility-search-count"
                style={{ color: 'grey', fontSize: '0.75rem' }}
            >
                Search Limite {123}
            </p>
            <p className="text-danger pan-error-in-cerdibility">
                {errorMessage}
            </p>
            {/* <Speedometer data={CredibilityData} /> */}
            <div className="table-credibilty">
                <Table
                    striped
                    responsive
                    className="striped-columns compact-table"
                >
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Company name</th>
                            <th>Candidate name</th>
                            <th>Offered date</th>
                            <th>Status</th>
                            <th>Action date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item?.company_name}</td>
                                <td>
                                    {
                                        CredibilityData?.data[0]?.basicDetails
                                            .name
                                    }
                                </td>
                                <td>{formatDate(item?.offer_date)}</td>
                                <td
                                    className={
                                        item?.offer_status == 'Accepted'
                                            ? 'text-success'
                                            : item?.offer_status == 'Pending'
                                            ? 'text-warning'
                                            : 'text-danger'
                                    }
                                >
                                    {item?.offer_status}
                                </td>
                                <td>{formatDate(item?.hired_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Row>
                {' '}
                <Col xs={6}></Col>
                <Col xs={2}>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleSelect}
                        value={itemsPerPage}
                        style={{
                            fontSize: '0.6rem',
                            background: '#3B96E1',
                            color: 'white',
                            fontWeight: '600',
                            width: '60px',
                            height: '36px',
                            backgroundImage: `url(${arrowdown})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.5rem center',
                            appearance: 'none',
                            backgroundSize: '20px',
                            padding: '10px 10px',
                            marginTop: '8px'
                        }}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                </Col>
                <Col
                    xs={2}
                    style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        marginTop: '18px'
                    }}
                >
                    {currentPage}-{itemsPerPage} out of {totalItems}
                </Col>
                <Col
                    xs={2}
                    style={{
                        marginTop: '8px',
                        marginLeft: '-10px'
                    }}
                >
                    <Pagination className="custom-pagination">
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
};

export default CredibilityEstablishment;
