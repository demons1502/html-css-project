import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// GUARD
import { AuthGuard, GuestGuard, ManagerGuard } from './guard';

// LAYOUTS
import AuthLayout from '../pages/Auth/Layout';
import MainLayout from '../pages/Main/Layout';
import AdminLayout from '../pages/Admin/Layout';

// AUTH VIEWS
const Login = lazy(() => import('../pages/Auth/views/Login'));

// MAIN VIEWS
const CustomerCare = lazy(() => import('../pages/CustomerCare'));
const FinanceConsultant = lazy(() => import('../pages/FinanceConsultant'));
const Survey = lazy(() => import('../pages/Survey'));
const Contract_management = lazy(() => import('../pages/ContractManagement'));
const FinancialSolution = lazy(() => import('../pages/FinancialSolution'));
const FinanceKnowledge = lazy(() => import('../pages/FinanceKnowledge'));
const Retirement = lazy(() => import('../pages/FinancialSolution/Retirement'));
const StartupFund = lazy(() =>
  import('../pages/FinancialSolution/StartupFund')
);
const ManageFinanceKnowledge = lazy(() =>
  import('../pages/ManageFinanceKnowledge')
);
const InheritanceFund = lazy(() =>
  import('../pages/FinancialSolution/InheritanceFund')
);
const ContingencyFund = lazy(() =>
  import('../pages/FinancialSolution/ContingencyFund')
);
const HealthFoundation = lazy(() =>
  import('../pages/FinancialSolution/HealthFoundation')
);
const EducationFoundation = lazy(() =>
  import('../pages/FinancialSolution/EducationFoundation')
);
const IllustrateFiduciary = lazy(() =>
  import('../pages/FinancialSolution/IllustrateFiduciary')
);
const PaymentManagement = lazy(() => import('../pages/PaymentManagement'));
const Admin = lazy(()=> import('../pages/Admin/index'))
// ADMIN VIEWS

export const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <GuestGuard element={<CustomerCare />} /> },
      {
        path: 'potential-customers',
        element: <GuestGuard element={<CustomerCare />} />,
      },
      {
        path: 'appointment-management',
        element: <GuestGuard element={<CustomerCare />} />,
      },
      {
        path: 'advise',
        children: [
          {
            path: 'survey',
            element: <GuestGuard element={<Survey />} />,
          },
          {
            path: 'finance-support',
            element: <GuestGuard element={<FinanceConsultant />} />,
          },
          {
            path: 'financial-solutions',
            element: <GuestGuard element={<FinancialSolution />} />,
            children: [
              {
                path: 'minh-hoa-gia',
                element: <GuestGuard element={<IllustrateFiduciary />} />,
              },
            ],
          },
          {
            path: 'contract-management',
            element: <GuestGuard element={<Contract_management />} />,
          },
        ],
      },
      {
        path: 'customer-care',
        element: <GuestGuard element={<CustomerCare />} />,
      },
      {
        path: 'q&a',
        element: <GuestGuard element={<ManageFinanceKnowledge />} />,
      },
      {
        path: 'finance-support',
        element: <GuestGuard element={<FinanceKnowledge />} />,
      },
      {
        path: 'retirement',
        element: <GuestGuard element={<Retirement />} />,
      },
      {
        path: 'startup-fund',
        element: <GuestGuard element={<StartupFund />} />,
      },
      {
        path: 'inheritance-fund',
        element: <GuestGuard element={<InheritanceFund />} />,
      },
      {
        path: 'contingency-fund',
        element: <GuestGuard element={<ContingencyFund />} />,
      },
      {
        path: 'education-foundation',
        element: <GuestGuard element={<EducationFoundation />} />,
      },
      {
        path: 'health-foundation',
        element: <GuestGuard element={<HealthFoundation />} />,
      },
      {
        path: 'payment',
        element: <GuestGuard element={<PaymentManagement />} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: '/auth', element: <Navigate to='login' /> },
      { path: 'login', element: <AuthGuard element={<Login />} /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: < Admin/> },
      {
        path: 'dashboard',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
    ],
  },
];
