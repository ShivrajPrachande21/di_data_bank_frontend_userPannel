import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Registration from '../registration/Registration';
import Login from '../login/Login';
import CompanyRegistration from '../registration/company_registration/CompanyRegistration';
import CompanyLogin from '../login/companyLogin/CompanyLogin';
import Profile from '../company-pannel/pages/profile/Profile';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../company-pannel/pages/dashboard/Dashboard';
import HireCandidate from '../company-pannel/pages/hireCandidate/HireCandidate';
import CreateJob from '../company-pannel/pages/create_job/CreateJob';
import SubscriptionPlan from '../company-pannel/pages/subscriptionPlan/SubscriptionPlan';
import Transaction from '../company-pannel/pages/transaction/Transaction';
import Support from '../company-pannel/pages/support/Support';
import Forgotpassword from '../forgotpassword/Forgotpassword';
import Candidate_Dashboard from '../candidate-pannel/candidate_dashboard/Candidate_Dashboard';
import EditCompanyProfile from '../company-pannel/pages/profile/editProfile/EditCompanyProfile';

import CompanyAiSearch from '../company-pannel/pages/hireCandidate/aiSearches/CompanyAiSearch';
import ViewCandidateDetails from '../company-pannel/pages/hireCandidate/viewCandidateDetails/ViewCandidateDetails';
import ViewJobApplication from '../company-pannel/pages/create_job/viewJobApplication/ViewJobApplication';
import Applications from '../company-pannel/pages/create_job/viewJobApplication/applications/Applications';
import ShortListed from '../company-pannel/pages/create_job/viewJobApplication/shortlisted/ShortListed';
import JobOffered from '../company-pannel/pages/create_job/viewJobApplication/job_offered/JobOffered';
import Hired from '../company-pannel/pages/create_job/viewJobApplication/hired/Hired';
import Subscriptions from '../company-pannel/pages/subscriptionPlan/subscriptions/Subscriptions';
import Topups from '../company-pannel/pages/subscriptionPlan/topups/Topups';
import Chatpage from '../company-pannel/pages/support/chatPage/Chatpage';
import Renew from '../company-pannel/pages/subscriptionPlan/renNew/Renew';
import EarlyBuy from '../company-pannel/pages/subscriptionPlan/earlyBuy/EarlyBuy';
import SearchJob from '../candidate-pannel/pages/searchJob/SearchJob';
import AppliedJob from '../candidate-pannel/pages/appliedJob/AppliedJob';
import CandidateSubscription from '../candidate-pannel/pages/candidateSubscrition/CandidateSubscription';
import CandidateTransaction from '../candidate-pannel/pages/candidateTransaction/CandidateTransaction';
import CandidateSupport from '../candidate-pannel/pages/candidateSupport/CandidateSupport';
import ViewJobDescription from '../candidate-pannel/pages/searchJob/viewJobDescription/ViewJobDescription';
import ViewCompanyDetails from '../candidate-pannel/pages/searchJob/viewCompanyDetails/ViewCompanyDetails';
import Job from '../candidate-pannel/pages/searchJob/viewCompanyDetails/job/Job';
import Reviews from '../candidate-pannel/pages/searchJob/viewCompanyDetails/reviews/Reviews';
import Details from '../candidate-pannel/pages/searchJob/viewCompanyDetails/details/Details';
import AppliedJobs from '../candidate-pannel/pages/appliedJob/appliedJobs/AppliedJobs';
import SavedJobs from '../candidate-pannel/pages/appliedJob/savedJobs/SavedJobs';
import ViewAppliedJobDetails from '../candidate-pannel/pages/appliedJob/viewAppliedJobDetails/ViewAppliedJobDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CompanyLogin />
    },

    {
        path: 'registration',
        element: <Registration />
    },
    {
        path: 'forgot-password',
        element: <Forgotpassword />
    },
    {
        path: 'company-registration',
        element: <CompanyRegistration />
    },

    {
        path: 'profile-page', // Fixed typo here
        element: <Profile />,
        children: [
            {
                path: 'edit',
                element: <EditCompanyProfile />
            }
        ]
    },
    {
        path: 'main',
        element: <DashboardLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'hire-candidate',
                element: <HireCandidate />
                // children: [
                //     {
                //         path: 'ai-search',
                //         element: <CompanyAiSearch />
                //     }
                // ]
            },
            {
                path: 'ai-search',
                element: <CompanyAiSearch />
            },
            {
                path: 'view-candidate-details',
                element: <ViewCandidateDetails />
            },
            {
                path: 'create-job',
                element: <CreateJob />
            },
            {
                path: 'view-job-application',
                element: <ViewJobApplication />,
                children: [
                    {
                        path: 'application',
                        element: <Applications />
                    },
                    {
                        path: 'shortlisted',
                        element: <ShortListed />
                    },
                    {
                        path: 'job-offred',
                        element: <JobOffered />
                    },
                    {
                        path: 'hired',
                        element: <Hired />
                    }
                ]
            },
            {
                path: 'subscription-plan',
                element: <SubscriptionPlan />,
                children: [
                    {
                        path: 'subscription',
                        element: <Subscriptions />
                    },
                    {
                        path: 'top-ups',
                        element: <Topups />
                    },
                    {
                        path: 'renew',
                        element: <Renew />
                    },
                    {
                        path: 'early-buy',
                        element: <EarlyBuy />
                    }
                ]
            },
            {
                path: 'transaction',
                element: <Transaction />
            },
            {
                path: 'support',
                element: <Support />
            }
        ]
    },
    {
        path: 'candidate-dashboard',
        element: <Candidate_Dashboard />,
        children: [
            {
                path: 'search-job',
                element: <SearchJob />
            },
            {
                path: 'view-job-details/:id',
                element: <ViewJobDescription />
            },
            {
                path: 'applied-job',
                element: <AppliedJob />,
                children: [
                    {
                        path: 'applied-jobs',
                        element: <AppliedJobs />
                    },
                    {
                        path: 'saved-jobs',
                        element: <SavedJobs />
                    }
                ]
            },
            {
                path: 'viewAppliedJobDetails/:id',
                element: <ViewAppliedJobDetails />
            },
            {
                path: 'subscription-candidate',
                element: <CandidateSubscription />
            },
            {
                path: 'transaction-candidate',
                element: <CandidateTransaction />
            },
            {
                path: 'support-candidate',
                element: <CandidateSupport />
            }
        ]
    },
    {
        path: 'view-company-desc/:id',
        element: <ViewCompanyDetails />,
        children: [
            {
                path: 'details',
                element: <Details />
            },
            {
                path: 'jobs',
                element: <Job />
            },
            {
                path: 'reviews',
                element: <Reviews />
            }
        ]
    },
    {
        path: 'chat-page/:id',
        element: <Chatpage />
    }
]);

export default router;
