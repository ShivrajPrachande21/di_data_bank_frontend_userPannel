import React from 'react';

import './notfound.css';
const NotFound = () => {
    return (
        <div style={{ height: '100vh' }}>
            <h1> Error Page Not Found </h1>
            {/* <p class="zoom-area">
                <b>CSS</b> animations to make a cool 404 page.{' '}
            </p> */}
            <section class="error-container">
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
                <span class="zero">
                    <span class="screen-reader-text">0</span>
                </span>
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
            </section>
            <div class="link-container">
                <a href="/" class="more-link">
                    Visit the original article
                </a>
            </div>
        </div>
    );
};

export default NotFound;
