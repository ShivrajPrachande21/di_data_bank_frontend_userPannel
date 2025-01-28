import React, { useState, useEffect } from 'react';

const CandidateProfileComplete = ({progress}) => {
  
    return (
        <h1
            style={{ ...getProgressiveBorderStyle(progress), ...staticH1Style }}
        >
            Profile Complete <span>{progress}%</span>
        </h1>
    );
};

export default CandidateProfileComplete;

// Static styles for the <h1>
const staticH1Style = {
    marginTop: '-2px',
    marginLeft: '2px',
    fontSize: '0.6rem',
    fontWeight: '500',
    background: '#f8f8f8',
    padding: '6px 16px',
    borderRadius: '12px',
    color: '#3b96e1',
    transition: 'border-color 0.5s ease'
};

// Function to progressively apply border styles based on the progress percentage
const getProgressiveBorderStyle = progress => {
    const borderLeft = progress > 0 ? '#3B96E1' : 'transparent'; // Starts at 0%
    const borderTop = progress > 25 ? '#3B96E1' : 'transparent'; // Starts at 25%
    const borderRight = progress > 50 ? '#3B96E1' : 'transparent'; // Starts at 50%
    const borderBottom = progress > 75 ? '#3B96E1' : 'transparent'; // Starts at 75%

    // For partial borders, dynamically adjust the size
    const leftBorderWidth = progress <= 25 ? `${progress * 4}%` : '100%';
    const topBorderWidth =
        progress > 25 && progress <= 50 ? `${(progress - 25) * 4}%` : '100%';
    const rightBorderWidth =
        progress > 50 && progress <= 75 ? `${(progress - 50) * 4}%` : '100%';
    const bottomBorderWidth =
        progress > 75 ? `${(progress - 75) * 4}%` : '100%';

    return {
        borderLeft: `2px solid ${borderLeft}`,
        borderTop: `2px solid ${borderTop}`,
        borderRight: `2px solid ${borderRight}`,
        borderBottom: `2px solid ${borderBottom}`,
        // Dynamic lengths for partial borders
        borderLeftWidth: leftBorderWidth,
        borderTopWidth: topBorderWidth,
        borderRightWidth: rightBorderWidth,
        borderBottomWidth: bottomBorderWidth,
        transition: 'all 0.5s ease' // Smooth transition for the progressive fill
    };
};
