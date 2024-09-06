import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './App.css';
import router from './router/router';
import Registration from './registration/Registration';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
