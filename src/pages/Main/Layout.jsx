import React, { Fragment, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Nav from '../../components/Nav';

export const MainLayout = () => {
  const { isAuth,me } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to='/auth' />;
  }
  return (
    <Fragment>
      <Header />
      {me.isPaid || me.isAdmin || me.qna ? null : 
      <Nav />
      }
      <div className='main-wrapper'>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default MainLayout;
