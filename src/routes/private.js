import React, {lazy} from 'react';
import Dashboard from '../assets/images/icons/dashboard.svg';
import Users from '../assets/images/icons/users.svg';
import Calendar from '../assets/images/icons/calendar.svg';
import Support from '../assets/images/icons/support.svg';
import Care from '../assets/images/icons/care.svg';
import QA from '../assets/images/icons/q&a.svg';
import Book from '../assets/images/icons/book.svg';

const CustomerCare = lazy(() => import('../pages/CustomerCare'));
const FinancialSolution = lazy(() => import('../pages/FinancialSolution'));

const PrivateRoutes = [
  {
    path: '/dashboard',
    key: 'dashboard',
    label: 'Dashboard',
    icon: Dashboard,
    page: <CustomerCare/>
  },
  {
    path: '/potential-customers',
    key: 'potential-customers',
    label: 'Khách hàng tiềm năng',
    icon: Users,
    page: <CustomerCare/>
  },
  {
    path: '/appointment-management',
    key: 'appointment-management',
    label: 'Quản lý lịch hẹn',
    icon: Calendar,
    page: <CustomerCare/>
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
        page: <CustomerCare/>
      },
      {
        path: '/advise/finance-support',
        key: 'advise-finance-support',
        label: 'Tư vấn tài chính',
        page: <CustomerCare/>
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
        page: <CustomerCare/>
      }
    ],
  },
  {
    path: '/customer-care',
    key: 'customer-care',
    label: 'Chăm sóc',
    icon: Care,
    page: <CustomerCare/>
  },
  {
    path: '/q&a',
    key: 'q&a',
    label: 'Hỏi đáp',
    icon: QA,
    page: <CustomerCare/>
  },
  {
    path: '/finance-support',
    key: 'finance-support',
    label: 'Kiến thức tư vấn tài chính',
    icon: Book,
    page: <CustomerCare/>
  }
];

export default PrivateRoutes;
