import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroutes = ({ element: Component, tokenType, ...rest }) => {
    const render = localStorage.getItem('render');
    let token = localStorage.getItem(tokenType);

    // Ensure token is a valid string
    if (typeof token !== 'string' || !token) {
        return <Navigate to="/" />;
    }
    return <Component {...rest} />;
};

export default Protectedroutes;
