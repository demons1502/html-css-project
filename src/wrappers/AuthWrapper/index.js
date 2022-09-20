import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../routes';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { useLocation } from 'react-router-dom';
import { RoutesWithOutMenu } from '../../routes/private';
import useLoading from '../../hooks/useLoading';

export default function App() {
  useLoading();
  const currentPath = useLocation();
  const noNav = ['/admin', '/q&a', '/payment', '/content-management'];

  return (
    <Suspense fallback={null}>
      <Header />
      {noNav.includes(currentPath.pathname) ? <></> : <Nav />}
      <div className='container'>
        <div className='main-wrapper'>
          <Suspense fallback={null}>
            <Routes>
              {PrivateRoutes?.map((item) => (
                <Route key={item.key} path={item?.path} element={item.page}>
                  {!!item.children &&
                    item.children.map((child) => (
                      <Route
                        key={child.key}
                        path={child.path}
                        element={child.page}
                      />
                    ))}
                </Route>
              ))}

              {RoutesWithOutMenu?.map((item) => (
                <Route key={item.key} path={item?.path} element={item.page}>
                  {!!item.children &&
                    item.children.map((child) => (
                      <Route
                        key={child.key}
                        path={child.path}
                        element={child.page}
                      />
                    ))}
                </Route>
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
