import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Row, Table } from 'react-bootstrap';
import CreateNewHr from '../createNewHr/CreateNewHr';
import EditProfile from '../../../../assets/images/EditProfile.png';
import Delete from '../../../../assets/images/delete.png';
import { AccessManagementContext } from '../../../../context/AccessManagementContext';
import { useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import EditUser from '../editUser/EditUser';
const AddNewUser = () => {
    const {
        getAllSubAdmin,
        accessData,
        showModule,
        setShowModule,
        loading,
        setLoading,
        showEditModule,
        setEditModule,
        DeleteUser,
        getSingleDatatoEdit
    } = useContext(AccessManagementContext);

    const locate = useLocation();
    const [userInput, setUserInput] = useState('');
    const handleInput = e => {
        setUserInput(e.target.value);
    };
    const handleEdit = async email => {
        await getSingleDatatoEdit(email);
        setEditModule(prev => !prev);
    };

    const filterData = accessData&&accessData?.filter(item => {
        return item?.email.toLowerCase().includes(userInput.toLowerCase());
    });
    useEffect(() => {
        getAllSubAdmin();
    }, [locate]);

    return (
        <>
            <div className="add-new-user-container">
                <div className="add-new-user-search">
                    <Button
                        size="sm"
                        onClick={() => setShowModule(prev => !prev)}
                        style={{ borderRadius: '14px' }}
                    >
                        Add New HR
                    </Button>
                    <input
                        type="text"
                        name="userInput"
                        value={userInput}
                        onChange={e => handleInput(e)}
                        placeholder="Enter something to search"
                    />
                </div>
                <div className="add-new-user-table">
                    <Table bordered className="custom-table">
                        <thead>
                            <tr>
                                <th className="p-3" scope="col">
                                    Sr.no
                                </th>
                                <th className="p-3" scope="col">
                                    HR Email
                                </th>

                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{ textAlign: 'center' }}
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {loading ? (
                            <BeatLoader color="#3b96e1" size={15} />
                        ) : filterData && filterData?.length !== 0 ? (
                            filterData?.map((item, index) => (
                                <>
                                    <tbody>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.email}</td>

                                            <td
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-evenly'
                                                }}
                                            >
                                                <Button
                                                    size="sm"
                                                    variant=""
                                                    className="edit-btns"
                                                    onClick={() =>
                                                        handleEdit(item?.email)
                                                    }
                                                >
                                                    <img
                                                        src={EditProfile}
                                                        alt=""
                                                        width="20ox"
                                                    />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant=""
                                                    className="delete-btns"
                                                    onClick={() =>
                                                        DeleteUser(item?.email)
                                                    }
                                                >
                                                    <img
                                                        src={Delete}
                                                        alt=""
                                                        width="20ox"
                                                    />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center' }}>
                                    {' '}
                                    <p>No data matches your search</p>
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>
            </div>
            <Modal
                show={showModule}
                onHide={() => setShowModule(prev => !prev)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '20px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <CreateNewHr />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showEditModule}
                onHide={() => setEditModule(prev => !prev)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '20px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditUser />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddNewUser;
