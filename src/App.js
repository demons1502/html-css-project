import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import AuthWrapper from './wrappers/AuthWrapper';

function App() {
  return (
    <ConfigProvider locale={locale} autoInsertSpaceInButton={false}>
      <BrowserRouter>
        <AuthWrapper/>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
