import React, { useEffect, useState } from 'react';
import './speedoMeter.css';

function Speedometer({ data }) {
    return (
        <>
            <div className="speed-cards">
                <h4>Credit Score</h4>
                <label className="LABLES">
                    <progress max="1000" value="700">
                        100%
                    </progress>
                </label>
                <h2>{Math.round(data?.creditScore || 0)}</h2>
                <p>{data?.message}</p>
            </div>
        </>
    );
}

export default Speedometer;
