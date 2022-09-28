import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ManagerGuard = ({ element }) => {
  const { isAuth, me } = useSelector((state) => state.auth);
  const { permissions } = me;
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/auth' />;
  }

  if (!(permissions.includes('payment') || permissions.includes('qa') || permissions.includes('admin'))) {
    return <Navigate to="/" />;
  }

  if (permissions.includes('payment') && !location.pathname.includes('/admin/payment')) {
    return <Navigate to="/admin/payment" />;
  } else if (permissions.includes('qa') && !location.pathname.includes('/admin/q&a')) {
    return <Navigate to="/admin/q&a" />;
  } 

  return element;
};

export default ManagerGuard;
