import { Col, Layout, List, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { sideBarMenuItems } from '../../../assets/fake-data/QuyDuPhongData';
import SearchInputBox from './SearchInputBox';
import ListCalculation from './ListCalculation';
import ListDetails from './ListDetails';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment, getSpeechScriptType, getAppointmentByIds, updateSelectCustomer } from "../../../slices/financialSolutions";
import moment from 'moment';
import Dialogue from '../../../components/common/Dialogue';

const StartupFund = ({ apptId = null }) => {
  const location = useLocation();
  const [title] = useState(location?.state?.title);

  const [itemContent, setItemContent] = useState({});
  const [lists, setLists] = useState(sideBarMenuItems);
  const [payload, setPayload] = useState('');

  const dispatch = useDispatch();
  var { customerAppRecords} = useSelector((state) => state.financialSolution);

  const getAppointmentNoId = () => {
    let endDate = new Date();
    // endDate = new Date(endDate.getTime() + 30 * 60 * 1000)
    endDate = endDate.setHours(23, 59, 59, 999);
    let startDate = new Date();
    dispatch(getAppointment({ titles: "finance", startDate: moment(startDate), endDate: moment(endDate) })) //main code
  }

  useEffect(() => {
    dispatch(getSpeechScriptType('preventionFund'))
    apptId ? dispatch(getAppointmentByIds(apptId)) : getAppointmentNoId()
  }, []);

  useEffect(() => {
    let arr = []
    arr.push(customerAppRecords?.map(item => {
      // dispatch(updateSelectCustomer(item.customerApptRecords[0].customerId))
      return { title: item.customerApptRecords[0].name, apptId: item.apptId, customerApptRecordId: item.customerApptRecords[0].customerApptRecordId }
    }))
    setLists(arr[0])
  }, [customerAppRecords])

  useEffect(() => {   //select item 1
    if (lists) {
      setItemContent(lists[0]);
    }
  }, [lists])

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
        <h3>{`${title ? title : 'Quỹ khởi nghiệp'}`}</h3>
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

                  <List
                    dataSource={lists}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => setItemContent(item)}
                        className={`${item === itemContent ? 'active' : ''}`}
                      >
                        <Typography.Text ellipsis>{item.title}</Typography.Text>
                      </List.Item>
                    )}
                  />
                </div>

                {/* container-right start */}
                <div className="container-right">
                  <div className="container-right-header">
                    <h1>Thông tin chi phí</h1>
                  </div>
                  <ListCalculation typeFund="startup" userSelected={itemContent}/>
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
                <Dialogue title="Lời thoại" type="preventionFund" />
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

export default StartupFund;
