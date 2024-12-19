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
import { SupportProvider } from './context/SupportContext';
import { SearchJobProvider } from './context/candidateContext/SearchJobContext';
import { AppliedJobProvider } from './context/candidateContext/AppliedJobContext';
import { TransactionProvider } from './context/candidateContext/TransactionContext';
import { SubscriptionsProvider } from './context/candidateContext/SubscriptionsContext';
import { CandidateSupportProvider } from './context/candidateContext/CandidateSupportContext';
import { CandidateProfileProvider } from './context/candidateContext/CandidateProfileContext';
import { AccessProvider } from './context/AccessManagementContext';
function App() {
    const [count, setCount] = useState(0);
    function useTabTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    return (
        <>
            <LoginProvider>
                <RegistrationProvider>
                    <HireCandidateProvider>
                        <ForgotPasswordProvider>
                            <CreateJobProvider>
                                <SubscriptionProvider>
                                    <SupportProvider>
                                        <SearchJobProvider>
                                            <AppliedJobProvider>
                                                <TransactionProvider>
                                                    <SubscriptionsProvider>
                                                        <CandidateSupportProvider>
                                                            <CandidateProfileProvider>
                                                                <AccessProvider>
                                                                    <RouterProvider
                                                                        router={
                                                                            router
                                                                        }
                                                                    />
                                                                </AccessProvider>
                                                                <ToastContainer />
                                                            </CandidateProfileProvider>
                                                        </CandidateSupportProvider>
                                                    </SubscriptionsProvider>
                                                </TransactionProvider>
                                            </AppliedJobProvider>
                                        </SearchJobProvider>
                                    </SupportProvider>
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
