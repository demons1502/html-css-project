import { Button, Col, Layout, List, Row, Typography, Spin } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import SearchInputBox from "./SearchInputBox";
// import ListDetails from "./ListDetails";
import { useNavigate, useSearchParams  } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TabMenu from "./Tabs/TabMenu";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerHistoryById } from "../../slices/surveys";
import { setData, setSelectedCustomer } from "../../slices/customers";
import { isEmpty } from "lodash";
import calender from "../../assets/images/icons/calendar.svg";
import left_arrow from "../../assets/images/icons/left-arrow.svg";
import { HistoryPopup } from "./Modals/HistoryPopup";
import { formatDate } from "../../helper/index";
import { getSppechScriptInfo, clearSurvey } from "../../slices/surveys";
import { getAppointments } from "../../slices/appointmentManagement";
import moment from "moment";
import Dialogue from "../../components/common/Dialogue";

const Survey = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState('');
  const { customers, surveys } = useSelector((state) => state);
  const appointments = useSelector((state) => state.appointment);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [customerList, setCustomerList] = useState([]);
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { data, selectedCustomer } = customers;
  const { me } = useSelector((state) => state.auth);
  const apptId = searchParams.get('appointment_id');

  useEffect(() => {
    if (!isEmpty(surveys?.survey)) {
      const filteredCustomer = data?.filter((customer) => customer?.customerId === selectedCustomer?.customerId);
      // setCustomerList(filteredCustomer);
    } else {
      // setCustomerList(data);
    }
  }, [customers, surveys?.survey]);

  useEffect(() => {
    const params = {
      titles: ['survey'],
      startDate: moment().format('YYYY-MM-DD HH:mm'),
      endDate: '2022-10-07 23:59:59'//moment().add(30, 'm').format('YYYY-MM-DD HH:mm')
    }
    // dispatch(getCustomerList());
    if (apptId) {
      dispatch(getAppointments(params));
    }
    else {
      dispatch(getAppointments(params));
    }
    
    // dispatch(getSppechScriptInfo());
  }, [dispatch]);

  useEffect(() => {
    appointments?.data?.length > 0 && dispatch(setData(appointments.data[0].customerApptRecords))
  }, [appointments.data, dispatch]);

  // useEffect(() => {
  //   customerList && setSelectedCustomer(customerList[0])
  // }, [customerList]);

  useEffect(() => {
    data?.length > 0 && dispatch(setSelectedCustomer(data[0]?.customerId));
  }, [data, dispatch]);

  const handleSelectCustomer = (id) => {
    dispatch(setSelectedCustomer(id));
  };

  const backToSurvey = () => {
    dispatch(clearSurvey());
  };

  const historyHandler = () => {
    dispatch(getCustomerHistoryById(selectedCustomer?.customerId));
  };
  const solutionHandler = () => {
    navigate('/advise/financial-solutions');
  };
  const counselHandler = () => {
    navigate('/advise/finance-consultant');
  };
  const appointmentHandler = () => {
    navigate('/appointment-management');
  };

  return (
    <Fragment>
      <div className="survey">
        <h3 className="title">{t('survey.title')}</h3>

        <div className="survey-container">
          <Row gutter={[16, 10]} justify="start" align="stretch">
            <Col lg={me?.isDefaultHelper? 15: 24} md={24} sm={24} xs={24}>
              <Layout.Content>
                <div className="content-div-1">
                  <div className="container-left">
                    <div className="container-search-box">
                      <h1 className="container-search-box-header">Người tham gia</h1>
                      <SearchInputBox setPayload={setPayload}></SearchInputBox>
                    </div>

                    {data?.length > 0 && (
                      <List
                        dataSource={data}
                        renderItem={(customer, index) => (
                          <List.Item
                            onClick={() => handleSelectCustomer(customer?.customerId)}
                            className={`${customer?.customerId === selectedCustomer?.customerId ? 'active' : ''}`}
                          >
                            <Typography.Text ellipsis>{customer?.name}</Typography.Text>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>

                  <div className="container-right">
                    {selectedCustomer?.customerId? (
                      <div className="container-right-header">
                        <div>
                          <HistoryPopup historyHandler={historyHandler} />
                        </div>
                        <div className="right">
                          <Button type="primary" className="btn-primary" onClick={solutionHandler}>
                            {t('common.solution')}
                          </Button>
                          <Button type="primary" className="btn-primary" onClick={counselHandler}>
                            {t('common.consultant')}
                          </Button>
                          <Button type="primary" className="btn-primary" onClick={appointmentHandler}>
                            {t('common.booking')}
                          </Button>
                        </div>
                      </div>
                    ) : (surveys?.survey?.createdAt?(
                      <div className="container-right-header" style={{ padding: '20px' }}>
                        <div onClick={backToSurvey} className="back-to-survey">
                          <img src={left_arrow} alt="back" height={12} style={{ marginRight: '5px' }} />
                        </div>
                        <div className="right">
                          <img src={calender} alt="calender" height={16} style={{ marginRight: "5px" }} />
                          <span>Ngày: {surveys?.survey?.createdAt ? formatDate(surveys?.survey?.createdAt) : ""}</span>
                        </div>
                      </div>
                    ): (
                      <div className="container-right-header" style={{ padding: '20px'  }}>
                        <h4 className="primary-color font-weight-bold"><strong>Chưa có lịch hẹn khảo sát</strong></h4>
                      </div>
                    ))}

                    {selectedCustomer?.customerId ? (<TabMenu />):(
                        <div className="primary-color font-weight-bold" style={{ padding: '20px', minHeight: '500px'  }}>
                          <strong>Chưa có lịch hẹn khảo sát khách hàng </strong>
                        </div>
                      )
                    }
                  </div>
                </div>
              </Layout.Content>
            </Col>

            {me?.isDefaultHelper && (
              <Col lg={9} md={24} sm={24} xs={24}>
                <Layout.Content className="manageContent">
                  <div className="content-div-2">
                    <Dialogue 
                      title="Quy trình khảo sát" 
                      type="survey" 
                      customerId={selectedCustomer?.customerId} 
                      keywords={{interestRate: 5}}/>
                  </div>
                </Layout.Content>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Survey;
