import React from 'react';

import { Modal } from 'react-bootstrap';
import { useSupport } from '../../context/SupportContext';

const DisplayImage = () => {
    const {
        smShowGloble,
        setSmShowGloble,
        imagesGloble,
        setImageGloble,
        handleGlobleModal,
        pdfGloble,
        setPdfGloble
    } = useSupport();
    console.log('dada', smShowGloble);
    return (
        <>
            <Modal
                size="md-down"
                show={smShowGloble}
                onHide={handleGlobleModal}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body>
                    {imagesGloble ? (
                        <iframe
                            srcDoc={`<html><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100%;"><img src="${imagesGloble}" src="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" style="max-width:100%;height:auto;"/></body></html>`}
                            width="100%"
                            height="470"
                            style={{
                                border: 'none'
                            }}
                            title="Embedded Image"
                        ></iframe>
                    ) : (
                        <iframe
                            src={pdfGloble}
                            width="100%"
                            height="470"
                            style={{
                                border: 'none'
                            }}
                            title="Embedded Image"
                        ></iframe>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DisplayImage;
