import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Table } from 'react-bootstrap';
import BaseUrl from '../../../../services/BaseUrl';
import arrowdown from '../../../../assets/images/arrowdown.png';
import { jwtDecode } from 'jwt-decode';
import oui_cross from '../../../../assets/images/oui_cross.png';
const DisplayHiredCandidate = ({ onHide }) => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [selectValue, setselectValue] = useState(itemsPerPage);
    const [totalPages, SettotalPages] = useState(0);
    const handleSelect = e => {
        const value = parseInt(e.target.value, 10);
        setItemsPerPage(value);
        setselectValue(value);
        setCurrentPage(1);
    };

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };
    // Ensure transactionData is an array before trying to paginate
    const isTransactionDataArray = Array.isArray(data);

    // Fallback to an empty array if transactionData is not an array
    const validTransactionData = isTransactionDataArray ? data : [];

    const totalItems = validTransactionData.length;

    // Get current items based on pagination
    const currentItems = validTransactionData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const getCandidateData = async () => {
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const company_id = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}/company/hired_job_status/${company_id}/${currentPage}/${selectValue}`
            );
            if (response?.status == 200 || response?.status == 201) {
                setData(response?.data?.candidates);
                SettotalPages(response?.data?.totalPages);
            }
        } catch (error) {}
    };

    const formatDate = dateString => {
        const date = new Date(dateString);

        // Get the day of the month with the correct suffix (st, nd, rd, th)
        const day = date.getDate();
        const daySuffix = day => {
            if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };

        // Format month and year
        const month = date.toLocaleString('en-GB', { month: 'short' }); // e.g., 'Aug'
        const year = date.getFullYear();

        // Return the formatted string
        return ` ${day}${daySuffix(day)} ${month} ${year}`;
    };

    useEffect(() => {
        getCandidateData();
        return () => {
            setData([]);
        };
    }, [selectValue, currentPage]);
    return (
        <div>
            <Row>
                <h2
                    style={{
                        textAlign: 'end',
                        marginTop: '-10px',
                        cursor: 'pointer'
                    }}
                    onClick={onHide}
                >
                    <img src={oui_cross} width={20} alt="" />
                </h2>

                <div style={{ marginTop: '-20px' }}>
                    <h3
                        style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        Hired Candidates
                    </h3>
                </div>
            </Row>
            <Table
                striped
                responsive
                className="striped-columns compact-table mt-2"
            >
                <thead>
                    <tr>
                        <th>Sr no.</th>
                        <th>Name</th>

                        <th>Email</th>
                        <th>Hired Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{formatDate(item?.offeredDate)}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Row
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '20px',
                    flexWrap: 'wrap'
                }}
            >
                <Col
                    xs={8}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* Pagination controls */}
                    <span
                        style={{
                            fontSize: '0.7rem',
                            marginRight: '20px',
                            fontWeight: '600'
                        }}
                    >
                        Result per page
                    </span>
                    <Col xs={12} md={2}>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleSelect}
                            value={selectValue}
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
                                padding: '10px 10px'
                            }}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </Col>
                    <Col
                        xs={12}
                        md={4}
                        style={{
                            fontSize: '0.7rem',
                            fontWeight: '600'
                        }}
                    >
                        {currentPage}-{itemsPerPage} out of {totalPages}
                    </Col>
                    <Col
                        xs={12}
                        md={3}
                        style={{
                            marginTop: '20px',
                            marginRight: '-100px'
                        }}
                    >
                        <Pagination className="custom-pagination">
                            <Pagination.First
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            />
                            <Pagination.Item active>
                                {currentPage}
                            </Pagination.Item>
                            <Pagination.Next
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default DisplayHiredCandidate;
