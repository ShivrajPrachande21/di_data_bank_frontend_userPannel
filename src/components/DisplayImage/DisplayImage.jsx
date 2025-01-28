import React from 'react';

import { Modal } from 'react-bootstrap';
import { useSupport } from '../../context/SupportContext';

const DisplayImage = ({button}) => {
    const {
        smShowGloble,
        setSmShowGloble,
        imagesGloble,
        setImageGloble,
        handleGlobleModal,
        pdfGloble,
        setPdfGloble
    } = useSupport();


    
    // Download Imaeg
    const handleDownload = async fileUrl => {
        if (fileUrl) {
            try {
                // Fetch the image as a Blob
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                // Create a temporary URL for the Blob object
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element and trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'offerletter.jpg'); // Set the file name

                // Append the link to the document and click it programmatically
                document.body.appendChild(link);
                link.click();

                // Clean up by revoking the object URL and removing the anchor
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading the image:', error);
            }
        } else {
            console.log('No file URL provided.');
        }
    };

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
                {button?(
                      <Modal.Footer>
                      <button
                              className="donwload-btn-job"
                              onClick={() =>
                                  handleDownload(imagesGloble?imagesGloble:pdfGloble)
                              }
                          >
                              download
                          </button>
      
                      </Modal.Footer>
                ):null}
              
            </Modal>
        </>
    );
};

export default DisplayImage;
