import React, { Fragment, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../routes';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { useLocation } from "react-router-dom";

export default function App() {
  const currentPath = useLocation();
  const noNav = ['/admin'];
  return (
    <Fragment>
      <Header />
      <div className="container">
        {noNav.includes(currentPath.pathname) ? (
          <></>
        ) :
          <Nav />
        }
        <div className="main-wrapper">
          <Suspense fallback={null}>
            <Routes>
              {PrivateRoutes?.map((item) => (
                <Route
                  key={item.key}
                  path={item?.path}
                  element={item.page}
                >
                  {
                    !!item.children && item.children.map((child) => (
                      <Route
                        key={child.key}
                        path={child.path}
                        element={child.page}
                      />
                    ))
                  }
                </Route>
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Fragment>
  )
}
