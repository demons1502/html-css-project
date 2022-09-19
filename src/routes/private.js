import React, { lazy } from 'react';
import Dashboard from '../assets/images/icons/dashboard.svg';
import Users from '../assets/images/icons/users.svg';
import Calendar from '../assets/images/icons/calendar.svg';
import Support from '../assets/images/icons/support.svg';
import Care from '../assets/images/icons/care.svg';
import QA from '../assets/images/icons/q&a.svg';
import Book from '../assets/images/icons/book.svg';
import StartupFund from '../pages/FinancialSolution/StartupFund';
import InheritanceFund from '../pages/FinancialSolution/InheritanceFund';
import ContingencyFund from '../pages/FinancialSolution/ContingencyFund';
import HealthFoundation from '../pages/FinancialSolution/HealthFoundation';
import EducationFoundation from '../pages/FinancialSolution/EducationFoundation';
import IllustrateFiduciary from '../pages/FinancialSolution/IllustrateFiduciary';

const CustomerCare = lazy(() => import('../pages/CustomerCare'));
const FinanceConsultant = lazy(() => import('../pages/FinanceConsultant'));
const Survey = lazy(() => import('../pages/Survey'));
const Admin = lazy(() => import('../pages/Admin'));
const Contract_management = lazy(() => import('../pages/ContractManagement'));
const FinanceKnowledge = lazy(() => import('../pages/FinanceKnowledge'));
const Login = lazy(() => import('../pages/Auth/views/Login'));
const FinancialSolution = lazy(() => import('../pages/FinancialSolution'));
const Retirement = lazy(() => import('../pages/FinancialSolution/Retirement'));
const PaymentManagement = lazy(() => import('../pages/PaymentManagement'));
const ManagementContent = lazy(() => import('../pages/ManageFinanceKnowledge'));

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
    page: <CustomerCare />,
  },
  {
    path: '/appointment-management',
    key: 'appointment-management',
    label: 'Quản lý lịch hẹn',
    icon: Calendar,
    page: <CustomerCare />,
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
        page: <Survey />,
      },
      {
        path: '/advise/finance-consultant',
        key: 'advise-finance-consultant',
        label: 'Tư vấn tài chính',
        page: <FinanceConsultant />,
      },
      {
        path: '/advise/financial-solutions',
        key: 'financial-solutions',
        label: 'Giải pháp tài chính',
        page: <FinancialSolution />,
      },
      {
        path: '/advise/contract-management',
        key: 'contract-management',
        label: 'Quản lý hợp đồng',
        page: <Contract_management />,
      },
    ],
  },
  {
    path: '/customer-care',
    key: 'customer-care',
    label: 'Chăm sóc',
    icon: Care,
    page: <CustomerCare />,
  },
  {
    path: '/q&a',
    key: 'q&a',
    label: 'Hỏi đáp',
    icon: QA,
    page: <CustomerCare />,
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
    onMenu: true,
    label: 'Quản lý khách hàng',
    icon: Users,
    page: <Admin />,
  },
  {
    path: '/retirement',
    key: 'retirement',
    page: <Retirement />,
  },
  {
    path: '/startup-fund',
    key: 'startup-fund',
    page: <StartupFund />,
  },
  {
    path: '/inheritance-fund',
    key: 'inheritance-fund',
    page: <InheritanceFund />,
  },
  {
    path: "/contingency-fund",
    key: "contingency-fund",
    page: <ContingencyFund />,
  },
  {
    path: "/education-foundation",
    key: "education-foundation",
    page: <EducationFoundation />,
  },
  {
    path: "/health-foundation",
    key: "health-foundation",
    page: <HealthFoundation />,
  },
  // {
  //   path: "/qminh-hoa-gia",
  //   key: "minh-hoa-gia",
  //   page: <MinhHoaGiaTriUyThac />,
  // },
];

export default PrivateRoutes;

export const RoutesWithOutMenu = [
  {
    path: '/advise/financial-solutions/minh-hoa-gia',
    key: 'minh-hoa-gia',
    label: 'Minh họa giá trị ủy thác',
    page: <IllustrateFiduciary />,
  },
  {
    path: '/payment',
    key: 'payment-management',
    label: 'Quản lý thanh toán',
    page: <PaymentManagement />,
  },
  {
    path: '/content-management',
    key: 'content-management',
    label: '',
    page: <ManagementContent />,
  },
];
