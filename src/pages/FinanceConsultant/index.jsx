import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Layout, List, Popover, Row, Typography } from 'antd';
import {ClockCircleOutlined  } from '@ant-design/icons'
import Participant from './components/participant';
import ConsultantProcess from './components/ConsultantProcess';
import HistorySelect from './components/historySelect';
import SpendingForm from './form/spendingForm';
import SearchInputBox from '../Survey/SearchInputBox';
import left_arrow from '../../assets/images/icons/left-arrow.svg';
import calender from '../../assets/images/icons/calendar.svg';
import { isEmpty } from 'lodash';
import * as S from '../../components/styles';
import { data } from './fakeData/customer';
import History from './history';
import { useNavigate } from 'react-router-dom';

export default function FinanceConsultant() {
  const { t } = useTranslation();
  const [selectId, setSelectId] = useState(null);
  const navigate=useNavigate()


  const handleSelect = (id) => {
    setSelectId(id);
  };

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
                      <SearchInputBox></SearchInputBox>
                    </div>

                    {data?.length > 0 && (
                      <List
                        dataSource={data}
                        renderItem={(customer, index) => (
                          <List.Item
                            onClick={() => handleSelect(customer?.customerId)}
                            className={`${customer?.customerId === selectId ? 'active' : ''}`}
                          >
                            <Typography.Text ellipsis>{customer?.fullname}</Typography.Text>
                          </List.Item>
                        )}
                      />
                    )}
                  </div>

                  <div className="container-right">
                    {isEmpty ? (
                      <div className="container-right-header">
                        <div className="financialConsultant-popover">
                          <Popover
                            placement="bottomLeft"
                            content={<History />}
                            title={
                              <div className="financialConsultant-popover_title">
                                <h5>{t('financial consultant.history title')}</h5>
                              </div>
                            }
                            trigger="click"
                            className='financialConsultant-popover-content'
                          >
                            <S.Button icon={<ClockCircleOutlined />}>{t('common.history')}</S.Button>
                          </Popover>
                        </div>
                        <div className="right">
                          <S.Button type="primary" onClick={()=>navigate('/advise/financial-solutions')}>{t('common.solution')}</S.Button>
                          <S.Button type="primary" onClick={()=> navigate('/appointment-management')}>{t('common.booking')}</S.Button>
                        </div>
                      </div>
                    ) : (
                      <div className="container-right-header">
                        <div>
                          <img src={left_arrow} alt="calender" height={12} style={{ marginRight: '5px' }} />
                        </div>
                        <div className="right">
                          <img src={calender} alt="calender" height={16} style={{ marginRight: '5px' }} />
                          <span>Ngày: 12/08/2022</span>
                        </div>
                      </div>
                    )}

                    <SpendingForm />
                  </div>
                </div>
              </Layout.Content>
            </Col>

            <Col lg={9} md={24} sm={24} xs={24}>
              <Layout.Content className="manageContent">
                <div className="content-div-2">
                  <ConsultantProcess title={t('financial consultant.process title')}/>
                </div>
              </Layout.Content>
            </Col>
          </Row>
        </div>
      </div>
      {/* <HistoryModal isModalOpen={isHistoryModalOpen} toggleModal={toggleHistoryModal} /> */}
    </Fragment>
  );
}
