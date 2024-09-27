import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './App.css';
import router from './router/router';
import Registration from './registration/Registration';
import { LoginProvider } from './context/LoginContext';
import { RegistrationProvider } from './context/RegistrationContex';
import ForgotPasswordProvider from './context/ForgotpasswordContext';
import { HireCandidateProvider } from './context/HireCandidateContex';
import { CreateJobProvider } from './context/CreateJobContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <LoginProvider>
                <RegistrationProvider>
                    <HireCandidateProvider>
                        <ForgotPasswordProvider>
                            <CreateJobProvider>
                                <SubscriptionProvider>
                                    <ToastContainer />
                                    <RouterProvider router={router} />
                                </SubscriptionProvider>
                            </CreateJobProvider>
                        </ForgotPasswordProvider>
                    </HireCandidateProvider>
                </RegistrationProvider>
            </LoginProvider>
        </>
    );
}

export default App;
