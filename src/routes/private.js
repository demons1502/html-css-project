import React, { lazy } from 'react';
import Dashboard from '../assets/images/icons/dashboard.svg';
import Users from '../assets/images/icons/users.svg';
import Calendar from '../assets/images/icons/calendar.svg';
import Support from '../assets/images/icons/support.svg';
import Care from '../assets/images/icons/care.svg';
import QA from '../assets/images/icons/q&a.svg';
import Book from '../assets/images/icons/book.svg';
import ManageFinanceKnowledge from '../pages/ManageFinanceKnowledge';

const CustomerCare = lazy(() => import('../pages/CustomerCare'));
const FinanceConsultant = lazy(() => import('../pages/FinanceConsultant'));
const Survey = lazy(() => import('../pages/Survey'));
const Admin = lazy(() => import('../pages/Admin'));
const Contract_management = lazy(() => import('../pages/ContractManagement'));
const FinanceKnowledge = lazy(() => import('../pages/FinanceKnowledge'));
const FinancialSolution = lazy(() => import('../pages/FinancialSolution'));
const Login = lazy(() => import("../pages/Auth/views/Login"));
const FinancialSolution = lazy(() => import("../pages/FinancialSolution"));

const PrivateRoutes = [
  {
    path: '/dashboard',
    key: 'dashboard',
    label: 'Dashboard',
    icon: Dashboard,
    page: <Login />,
  },
  {
    path: '/potential-customers',
    key: 'potential-customers',
    label: 'Khách hàng tiềm năng',
    icon: Users,
    page: <CustomerCare />
  },
  {
    path: '/appointment-management',
    key: 'appointment-management',
    label: 'Quản lý lịch hẹn',
    icon: Calendar,
    page: <CustomerCare />
  },
  {
    path: '/advise',
    key: 'advise',
    label: 'Tư vấn',
    icon: Support,
    children: [
      {
        path: '/advise/survey',
        key: 'survey',
        label: 'Khảo sát',
        page: <Survey/>
      },
      {
        path: '/advise/finance-consultant',
        key: 'advise-finance-consultant',
        label: 'Tư vấn tài chính',
        page: <FinanceConsultant/>
      },
      {
        path: '/advise/financial-solutions',
        key: 'financial-solutions',
        label: 'Giải pháp tài chính',
        page: <FinancialSolution />
      },
      {
        path: '/advise/contract-management',
        key: 'contract-management',
        label: 'Quản lý hợp đồng',
        page: <Contract_management />
      }
    ],
  },
  {
    path: '/customer-care',
    key: 'customer-care',
    label: 'Chăm sóc',
    icon: Care,
    page: <CustomerCare />

  },
  {
    path: '/q&a',
    key: 'q&a',
    label: 'Hỏi đáp',
    icon: QA,
    page: <ManageFinanceKnowledge />,
  },
  {
    path: '/finance-support',
    key: 'finance-support',
    label: 'Kiến thức tư vấn tài chính',
    icon: Book,
    page: <FinanceKnowledge />,
  },
  {
    path: '/admin',
    key: 'admin',
    label: 'Quản lý khách hàng',
    icon: Users,
    page: <Admin />
  }
];

export default PrivateRoutes;