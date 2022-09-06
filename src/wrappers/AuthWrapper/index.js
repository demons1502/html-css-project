import React, {Fragment, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import {PrivateRoutes} from '../../routes'
import Header from '../../components/Header'
import Nav from '../../components/Nav'

export default function App() {
  return (
    <Fragment>
      <Header/>
      <Nav/>
      <div className="container">
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
    </Fragment>
  )
}
