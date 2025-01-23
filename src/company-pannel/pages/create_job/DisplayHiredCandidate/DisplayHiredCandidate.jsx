import React from 'react';
import { Table } from 'react-bootstrap';

const DisplayHiredCandidate = () => {
    return (
        <>
            <Table striped responsive className="striped-columns compact-table">
                <thead>
                    <tr>
                        <th>Sr no.</th>
                        <th>Company name</th>

                        <th>Offered date</th>
                        <th>Offer Validity</th>
                        <th>Status</th>
                        <th>Action date</th>
                    </tr>
                </thead>
            </Table>
        </>
    );
};

export default DisplayHiredCandidate;
