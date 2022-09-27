import React, { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { PageHeader, Typography } from 'antd';
import {SettingOutlined, PlusOutlined, DownloadOutlined} from '@ant-design/icons';
// Styles
import * as S from "../../components/styles";


export const AdminLayout = () => {
  return (
    <Fragment>
      <Header />
      {/* <S.PageHeader
        className="site-page-header-responsive"
        backIcon={false}
        onBack={() => window.history.back()}
        title="Admin quản lý khách hàng Manulife"
        extra={[
          <S.Button key="1">Xóa</S.Button>,
          <S.Button key="2">Khởi tạo lại</S.Button>,
          <S.Button key="3" type="primary" icon={<DownloadOutlined style={{ fontSize: '14px' }}/>}>
            Import
          </S.Button>,
          <S.Button key="4" type="primary" icon={<PlusOutlined />}>
            Tạo mới
          </S.Button>,
          <S.Button key="5" className='btn-hover-primary' icon={<SettingOutlined key="6" style={{ fontSize: '20px' }}/>}></S.Button>
           
        ]}
      >
      </S.PageHeader> */}
      {/* <Nav /> */}
      <div className='main-wrapper'>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
