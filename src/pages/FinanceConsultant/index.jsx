import { ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { Col, Layout, List, Popover, Row, Typography } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import calender from '../../assets/images/icons/calendar.svg';
import Dialogue from '../../components/common/Dialogue';
import * as S from '../../components/styles';
import { formatDate } from '../../helper';
import { getAppointment, getAppointments } from '../../slices/appointmentManagement';
import SearchInputBox from '../Survey/SearchInputBox';
import HistoryDetail from './components/historyDetail';
import SpendingForm from './form/spendingForm';
import History from './history';

export default function FinanceConsultant() {
  const { t } = useTranslation();
  const [selectItem, setSelectItem] = useState(null);
  const [history, setHistory] = useState(null);
  const [searchPayload, setSearchPayload] = useState('');
  const [keywords, setKeywords] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptId, setApptId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment);

  // console.log(customerId);

  const handleSelect = (item) => {
    setSelectItem(item);
    setHistory(null);
  };

  useEffect(() => {
    const apptId = searchParams.get('appointment_id');
    const customerId = searchParams.get('customer_id');
    if (apptId) {
      setApptId(apptId);
      dispatch(getAppointment(apptId));
    } else {
      const params = {
        titles: ['consult'],
        startDate: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment().add(30, 'm').utc().format('YYYY-MM-DD HH:mm:ss'),
      };
      dispatch(getAppointments(params));
    }
    customerId && setCustomerId(customerId);
  }, [searchParams]);

  useEffect(() => {
    const customerList = appointments?.data?.length > 0 ? appointments?.data[0]?.customerApptRecords : null;
    const dataFilter = customerList?.filter((item) => item.name.toLowerCase().includes(searchPayload.toLowerCase()));
    setData(dataFilter);
    // data.push(
    //   ...dataFilter.map((item) => {
    //     return {
    //       title: item.customerApptRecords[0].name,
    //       apptId: item.apptId,
    //       customerApptRecordId: item.customerApptRecords[0].customerApptRecordId,
    //       customerId: item.customerApptRecords[0].customerId,
    //     };
    //   })
    // );
  }, [appointments?.data, searchPayload]);

  useEffect(() => {
    if (customerId) {
      const index = data?.findIndex((item) => item.customerId === +customerId);
      setSelectItem(data[index]);
    } else {
      setSelectItem(data?.[0]);
    }
  }, [data]);

  return (
    <Fragment>
      <div className="financialConsultant">
        <h3 className="title">{t('financial consultant.title')}</h3>
        <div className="financialConsultant-container">
          <Row gutter={[16, 10]} justify="start" align="stretch">
            <Col lg={15} md={24} sm={24} xs={24}>
              <Layout.Content>
                <div className="content-div-1">
                  <div className="container-left">
                    <div className="container-search-box">
                      <h1 className="container-search-box-header">Người tham gia</h1>
                      <SearchInputBox setPayload={setSearchPayload}></SearchInputBox>
                    </div>

                    {data?.length > 0 && (
                      <List
                        dataSource={data}
                        renderItem={(customer) => (
                          <List.Item
                            onClick={() => handleSelect(customer)}
                            className={`${customer === selectItem ? 'active' : ''}`}
                          >
                            <Typography.Text ellipsis>{customer?.name}</Typography.Text>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>

                  <div className="container-right">
                    {!history ? (
                      <div className="container-right-header">
                        <div className="financialConsultant-popover">
                          <Popover
                            placement="bottomLeft"
                            content={<History setHistory={setHistory} id={selectItem?.customerId} />}
                            title={
                              <div className="financialConsultant-popover_title">
                                <h5>{t('financial consultant.history title')}</h5>
                              </div>
                            }
                            trigger="click"
                            className="financialConsultant-popover-content"
                          >
                            <S.Button icon={<ClockCircleOutlined />}>{t('common.history')}</S.Button>
                          </Popover>
                        </div>
                        <div className="right">
                          <S.Button type="primary" onClick={() => navigate('/advise/financial-solutions')}>
                            {t('common.solution')}
                          </S.Button>
                          <S.Button type="primary" onClick={() => navigate('/appointment-management')}>
                            {t('common.booking')}
                          </S.Button>
                        </div>
                      </div>
                    ) : (
                      <div className="container-right-header">
                        <div className="container-right-header_arrow" onClick={() => setHistory(null)}>
                          {/* <img src={left_arrow} alt="calender" height={12} style={{ marginRight: '5px' }} /> */}
                          <LeftOutlined className="icon" />
                        </div>
                        <div className="right">
                          <img src={calender} alt="calender" height={16} style={{ marginRight: '5px' }} />
                          <span>Ngày: {formatDate(history?.createdAt)}</span>
                        </div>
                      </div>
                    )}
                    {history ? (
                      <HistoryDetail history={history} />
                    ) : (
                      <SpendingForm
                        id={customerId || selectItem?.customerId}
                        useSelected={{ ...selectItem, apptId: apptId }}
                        setKeywords={setKeywords}
                      />
                    )}
                  </div>
                </div>
              </Layout.Content>
            </Col>

            <Col lg={9} md={24} sm={24} xs={24}>
              <Layout.Content className="manageContent">
                <div className="content-div-2">
                  <Dialogue
                    type="consult"
                    title={t('financial consultant.process title')}
                    customerId={customerId || selectItem?.customerId}
                    keywords={keywords}
                  />
                </div>
              </Layout.Content>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}
