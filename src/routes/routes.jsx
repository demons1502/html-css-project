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

// ADMIN VIEWS

export const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <GuestGuard element={<CustomerCare />} /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: '/auth', element: <Navigate to='login' /> },
      { path: 'login', element: <AuthGuard element={<Login />} /> },
      {
        path: 'potential-customers',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
      {
        path: 'appointment-management',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
      {
        path: 'advise',
        children: [
          {
            path: 'survey',
            element: <ManagerGuard element={<Survey />} />,
          },
          {
            path: 'finance-support',
            element: <ManagerGuard element={<FinanceConsultant />} />,
          },
          {
            path: 'financial-solutions',
            element: <ManagerGuard element={<FinancialSolution />} />,
          },
          {
            path: 'contract-management',
            element: <ManagerGuard element={<Contract_management />} />,
          },
        ],
      },
      {
        path: 'customer-care',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
      { path: 'q&a', element: <ManagerGuard element={<CustomerCare />} /> },
      {
        path: 'finance-support',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <Navigate to='dashboard' /> },
      {
        path: 'dashboard',
        element: <ManagerGuard element={<CustomerCare />} />,
      },
    ],
  },
];
