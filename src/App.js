import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import Router from './routes';
import store from './store';
import { setupInterceptor } from './services/axios';

setupInterceptor(store);
function App() {
  return (
    <ConfigProvider locale={locale} autoInsertSpaceInButton={false}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
