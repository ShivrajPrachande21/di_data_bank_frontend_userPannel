import React, { useEffect, useState } from 'react';
import './support.css';
import { Button, Modal, Row, Table } from 'react-bootstrap';
import SearchIconS from '../../../assets/images/SearchIconS.png';
import chatIcon from '../../../assets/images/chatIcon.png';
import { useNavigate } from 'react-router-dom';
import { useSupport } from '../../../context/SupportContext';
import Addissue from './addIssue/Addissue';
const Support = () => {
    const { fetch_all_issue, data, modalShow, setModalShow } = useSupport();
    const [SeacrhInput, SetSeacrhInput] = useState('');
    console.log('dataatatt', data);

    const navigate = useNavigate();
    function navigateChate(id) {
        navigate(`/chat-page/${id}`);
    }

    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const fiteredData = data?.filter(item => {
        console.log('item?.Issue_type', item?.Issue_type);
        return item?.Issue_type.toLowerCase().includes(
            SeacrhInput.toLowerCase()
        );
    });

    useEffect(() => {
        fetch_all_issue();
    }, []);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/main/support');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);

    function RemovePath(imageUrl) {
        if(imageUrl){
            return imageUrl.split("\\").pop();
        }
        return "N/A"
    }

    function toCamelCase_Name(input) {
        if(typeof input=='string'){
        return input?input
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '):null
        }else{
          return input;
        }
      }
    return (
        <>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalShow(false)}
                dialogClassName="add-modal-width"
            >
                <Addissue />
            </Modal>
            <div className="support">
                <Row>
                    <div className="Search-support">
                        <Button
                            size="sm"
                            className="add-issue-btn"
                            onClick={() => setModalShow(prev => !prev)}
                        >
                            Add Issue +
                        </Button>
                        <div className="search-bar-suport">
                            <img src={SearchIconS} alt="" width="20px" />
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={e => SetSeacrhInput(e.target.value)}
                            />
                        </div>
                    </div>
                </Row>
                <Row className="mt-2">
                    <Table bordered responsive className="custom-table">
                        <thead>
                            <tr style={{ borderTop: 'none' }}>
                                <th
                                    style={{
                                        fontSize: '0.8rem',
                                        borderLeft: 'none',
                                        color: '#051F50'
                                    }}
                                    className="p-3"
                                    scope="col"
                                >
                                    Sr. No
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Issue Type
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Description
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Chat
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    File
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Date
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '0.8rem' }}>
                            {fiteredData?.map((item, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.Issue_type}</td>
                                        <td>{item?.description}</td>
                                        <td>
                                            <img
                                                src={chatIcon}
                                                alt=""
                                                width="20px"
                                                onClick={() =>
                                                    navigateChate(item?._id)
                                                }
                                            />
                                        </td>
                                        <td>{RemovePath(item?.file)}</td>
                                        <td>{formatDate(item?.createdDate)}</td>
                                        <td>
                                            <p
                                                style={{
                                                    color:
                                                    item?.status ==
                                                        'solved'
                                                            ? 'green'
                                                            : item?.status ===
                                                              'reject'
                                                            ? 'red'
                                                            : '#051F50'
                                                }}
                                            >
                                                {toCamelCase_Name(item?.status)}
                                            </p>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </>
    );
};

export default Support;
