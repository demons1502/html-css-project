import { Col, Layout, List, Row, Typography } from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageBack from '../../../assets/images/financial/PageBack';
import { sideBarMenuItems } from '../../../assets/fake-data/QuyDuPhongData';
import SearchInputBox from './SearchInputBox';
import ListCalculation from './ListCalculation';
import ListDetails from './ListDetails';
import { useDispatch, useSelector } from 'react-redux';
import Dialogue from '../../../components/common/Dialogue/index';
import moment from 'moment';
import { getAppointments, getAppointment } from '../../../slices/appointmentManagement';

const Retirement = () => {
  const [itemContent, setItemContent] = useState({});
  const [payload, setPayload] = useState('');
  const [keywords, setKeywords] = useState({});
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptId, setApptId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment);

  useEffect(() => {
    const apptId = searchParams.get('appointment_id');
    const customerId = searchParams.get('customer_id');
    if (apptId) {
      setApptId(apptId);
      dispatch(getAppointment(apptId));
    } else {
      const params = {
        titles: ['survey'],
        startDate: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().add(30, 'm').utc().format('YYYY-MM-DD HH:mm:ss'),
      };
      dispatch(getAppointments(params));
    }
    customerId && setCustomerId(customerId);
  }, [searchParams]);

  useEffect(() => {
    const customerList = appointments?.data?.length > 0 ? appointments?.data[0]?.customerApptRecords : null;
    const dataFilter = customerList?.filter((item) => item.name.toLowerCase().includes(payload.toLowerCase()));
    setData(dataFilter);
  }, [appointments?.data, payload]);

  useEffect(() => {
    if (customerId) {
      const index = data?.findIndex((item) => item.customerId === +customerId);
      setItemContent(data[index]);
    } else {
      setItemContent(data?.[0]);
    }
  }, [data]);

  return (
    <div className="quyduphone">
      {/* quyduphone-nav start */}
      <div className="quyduphone-nav">
        <Link className="quyduphone-nav-icon" to="/advise/financial-solutions">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <h3 className="quyduphone-nav-title">Quỹ Hưu trí</h3>
      </div>

      {/* quyduphone-nav end  */}

      {/* quyduphone-container start */}
      <div className="quyduphone-container">
        <Row gutter={[16, 10]} justify="start" align="stretch">
          <Col lg={12} md={24} sm={24} xs={24}>
            <Layout.Content>
              {/* content-div-1 start  */}
              <div className="content-div-1">
                <div className="container-left">
                  <div className="container-search-box">
                    <h1 className="container-search-box-header">Người tham gia</h1>
                    <SearchInputBox setPayload={setPayload}></SearchInputBox>
                  </div>

                  {data?.length > 0 && (
                    <List
                      dataSource={data}
                      renderItem={(item, index) => (
                        <List.Item
                          onClick={() => {
                            setItemContent(item);
                          }}
                          className={`${item === itemContent ? 'active' : ''}`}
                        >
                          <Typography.Text ellipsis>{item.name}</Typography.Text>
                        </List.Item>
                      )}
                    />
                  )}
                </div>

                {/* container-right start */}
                <div className="container-right">
                  <div className="container-right-header">
                    <h1>Thông tin chi phí</h1>
                  </div>
                  <ListCalculation
                    typeFund="pension"
                    userSelected={{ ...itemContent, apptId: apptId }}
                    setKeywords={setKeywords}
                  />
                </div>

                {/* container-right end */}
              </div>

              {/* content-div-1 end  */}
            </Layout.Content>
          </Col>

          {/* manageContent start  */}
          <Col lg={12} md={24} sm={24} xs={24}>
            <Layout.Content className="manageContent">
              <div className="content-div-2">
                <Dialogue title={'Lời thoại'} type={'preventionFund'} customerId={customerId} keywords={keywords} />
              </div>
            </Layout.Content>
          </Col>
          {/* manageContent end  */}
        </Row>
      </div>

      {/* quyduphone-container end */}
    </div>
  );
};

export default Retirement;
