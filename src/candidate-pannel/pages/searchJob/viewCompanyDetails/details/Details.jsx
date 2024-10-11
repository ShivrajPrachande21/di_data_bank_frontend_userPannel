import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../../../services/BaseUrl';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const getJobDetails = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}/candidate/basic_details/${id}`
            );

            setDetails(response?.data[0]);
        } catch (error) {}
    };
    useEffect(() => {
        getJobDetails();
    }, []);
    return (
        <div style={{ padding: '14px' }}>
            <table style={{ cursor: 'pointer' }}>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">Email:</span>{' '}
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.email}Years
                        </span>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">Mobile:</span>{' '}
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.mobile}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">Location:</span>{' '}
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.location}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">Website:</span>{' '}
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.website_url}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">Company Size:</span>{' '}
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.company_size}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            paddingRight: '30px'
                        }}
                    >
                        <span className="card-table-span">
                            Headquarters Address:
                        </span>
                    </td>
                    <td>
                        {' '}
                        <span className="card-table-span">
                            {details?.headQuater_add}
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Details;
