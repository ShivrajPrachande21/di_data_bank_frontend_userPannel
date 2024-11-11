import React, { useState, useContext, useEffect } from 'react';
import { Col, Pagination, Row, Table } from 'react-bootstrap';
import arrowdown from '../../../assets/images/arrowdown.png';
import { TransactionContext } from '../../../context/candidateContext/TransactionContext';

const CandidateTransaction = () => {
    const { transactionData, fetch_transaction } =
        useContext(TransactionContext);
    console.log('appus  transction', transactionData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectValue, setselectValue] = useState(itemsPerPage);

    const handleSelect = e => {
        const value = parseInt(e.target.value, 10);
        setselectValue(value);
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when items per page change
    };

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    // Ensure transactionData is an array before trying to paginate
    const isTransactionDataArray = Array.isArray(transactionData);

    // Fallback to an empty array if transactionData is not an array
    const validTransactionData = isTransactionDataArray ? transactionData : [];

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
        fetch_transaction();
    }, []);
    function rendering() {
        const render = localStorage.getItem('render');

        if (render === 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <>
            <div className="p-2 transaction">
                <Row
                    style={{
                        borderRadius: '12px',
                        background: '#fff',
                        marginLeft: '2px',
                        marginTop: '20px'
                    }}
                >
                    <Col xs={12} style={{ marginTop: '6px' }}>
                        <Table bordered className="custom-table">
                            <thead>
                                <tr style={{ borderTop: 'none' }}>
                                    <th
                                        style={{
                                            fontSize: '0.8rem',
                                            borderLeft: 'none'
                                        }}
                                        className="p-3"
                                        scope="col"
                                    >
                                        Sr no
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Type
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Plan / Top-Up Name
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Duration
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Amount
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Payment Method
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Transaction ID
                                    </th>
                                    <th
                                        className="p-3"
                                        scope="col"
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Purchased Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.8rem' }}>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ borderLeft: 'none' }}>
                                            {(currentPage - 1) * itemsPerPage +
                                                index +
                                                1}
                                        </td>
                                        <td>{item?.type}</td>
                                        <td>{item?.Plane_name}</td>
                                        <td>
                                            {formatDate(item?.purchesed_data)} -
                                            {formatDate(item?.Expire_date)}
                                        </td>
                                        <td>
                                            <span
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: '1rem',
                                                    marginRight: '4px'
                                                }}
                                            >
                                                &#8377;
                                            </span>
                                            {item?.price}
                                        </td>
                                        <td>{item?.payment_method}</td>
                                        <td>{item?.transaction_Id}</td>
                                        <td>
                                            {formatDate(item?.purchesed_data)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Row
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '20px'
                        }}
                    >
                        <Col
                            xs={8}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            {/* Pagination controls */}
                            <span
                                style={{
                                    fontSize: '0.8rem',
                                    marginRight: '20px',
                                    fontWeight: '600'
                                }}
                            >
                                Result per page
                            </span>
                            <Col xs={2}>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleSelect}
                                    value={selectValue}
                                    style={{
                                        fontSize: '0.7rem',
                                        background: '#3B96E1',
                                        color: 'white',
                                        fontWeight: '600',
                                        width: '60px',
                                        height: '36px',
                                        backgroundImage: `url(${arrowdown})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition:
                                            'right 0.5rem center',
                                        appearance: 'none',
                                        backgroundSize: '20px',
                                        padding: '10px 10px'
                                    }}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                </select>
                            </Col>
                            <Col
                                xs={2}
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}
                            >
                                {currentPage}-{itemsPerPage} out of {totalItems}
                            </Col>
                            <Col
                                xs={2}
                                style={{
                                    marginTop: '20px',
                                    marginRight: '-160px'
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
                                        <p
                                            style={{
                                                fontSize: '0.8rem',
                                                marginBottom: '0px',
                                                marginTop: '4px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {currentPage}
                                        </p>
                                    </Pagination.Item>
                                    <Pagination.Next
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                    />
                                    <Pagination.Last
                                        onClick={() =>
                                            handlePageChange(totalPages)
                                        }
                                        disabled={currentPage === totalPages}
                                    />
                                </Pagination>
                            </Col>
                        </Col>
                    </Row>
                </Row>
            </div>
        </>
    );
};

export default CandidateTransaction;
