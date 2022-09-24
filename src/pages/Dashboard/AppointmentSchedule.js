import { Checkbox, Col, Row, Slider } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import alarmGray from '../../assets/images/icons/alarmGray.svg';
import calendar from '../../assets/images/icons/calendar.svg';
import company from '../../assets/images/icons/company.svg';
import location from '../../assets/images/icons/location.svg';
import Filter from '../../components/common/Filter';
import * as S from './styles';

const options = [
  { label: 'Tư vấn hợp đồng bảo hiểm', value: 1 },
  { label: 'Ký hợp đồng', value: 2 },
  { label: 'Sinh nhật', value: 3 },
  { label: 'Ký hợp đồng', value: 4 },
];

export default function AppointmentSchedule() {
  const { t } = useTranslation();
  const [payload, setPayload] = useState('');
  const arrWeek = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'];
  const [weeks, setWeeks] = useState([]);
  const [activeKey, setActiveKey] = useState('1');

  const getListDateOfWeek = () => {
    const now = moment();
    const formatDate = moment(`${now.date() - 1}-${now.month() + 1}-${now.year()}`, 'DD/MM/YYYY');
    const templateWeek = [];
    for (let index = 0; index < 7; index++) {
      const currentDay = formatDate.add(1, 'days');
      const dayOfWeek = arrWeek[currentDay.day()];
      const date = currentDay.format('DD/MM');
      templateWeek.push({ dayOfWeek, date });
    }
    setWeeks(templateWeek);
  };

  const handleActiveKey = (value) => {
    setActiveKey(value);
  };

  useEffect(() => {
    getListDateOfWeek();
  }, []);

  return (
    <S.WrapContainer $maxHeight="768px">
      <S.WrapTitle $noneIcon $toggle>
        <Col>
          <S.Title $nonePadding>{t('dashboard-page.appointment-schedule')}</S.Title>
        </Col>
        <Col flex="auto">
          <Row>
            <S.WrapTextCenter span={24}>Hoàn thành 12/64</S.WrapTextCenter>
            <Col span={24}>
              <Slider defaultValue={30} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Filter options={options} setPayload={setPayload}></Filter>
        </Col>
      </S.WrapTitle>
      <S.WrapContent $padding="15px">
        <S.Tabs activeKey={activeKey} onChange={handleActiveKey}>
          {weeks.map((element, idx) => (
            <S.Tabs.TabPane
              tab={idx + 1 == activeKey ? `${element.dayOfWeek}(${element.date})` : element.dayOfWeek}
              key={idx + 1}
            >
              <S.ItemAppointment>
                <S.WrapFirstColAppointment span={24}>
                  <Row>
                    <Col span={20}>
                      <Row>
                        <S.WrapImageAppointment $width="15px" $height="15px" src={company} alt="company" />
                        <Col span={22}>
                          <Row gutter={[0, 4]}>
                            <S.WrapTextItem $fontSize="14px" $fontWeight="700" $lineHeight="18px" span={24}>
                              Brooklyn Simmons (Doanh nghiệp - 5)
                            </S.WrapTextItem>
                            <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                              Tư vấn hợp đồng bảo hiểm
                            </S.WrapTextItem>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <S.WrapTextRight span={4}>
                      <Checkbox className="checkbox-item" />
                    </S.WrapTextRight>
                  </Row>
                </S.WrapFirstColAppointment>
                <S.WrapHr />
                <S.WrapSecondColAppointment span={24}>
                  <Row gutter={5}>
                    <Col span={6}>
                      <Row>
                        <S.WrapImageAppointment $width="15px" $height="15px" src={calendar} alt="company" />
                        <S.WrapBorderRight span={18}>
                          <Row gutter={[0, 4]}>
                            <Col span={24}>Ngày hẹn:</Col>
                            <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                              10/07/2022
                            </S.WrapTextItem>
                          </Row>
                        </S.WrapBorderRight>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Row>
                        <S.WrapImageAppointment $width="15px" $height="15px" src={alarmGray} alt="company" />
                        <S.WrapBorderRight span={18}>
                          <Row gutter={[0, 4]}>
                            <Col span={24}>Thời gian:</Col>
                            <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                              08:15 (20p)
                            </S.WrapTextItem>
                          </Row>
                        </S.WrapBorderRight>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <S.WrapImageAppointment $width="15px" $height="15px" src={location} alt="company" />
                        <Col span={20}>
                          <Row gutter={[0, 4]}>
                            <Col span={24}>Địa điểm:</Col>
                            <S.WrapTextItem $fontWeight="600" $lineHeight="15px" span={24}>
                              Lô 22, số 35 Lê Văn Thiêm
                            </S.WrapTextItem>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </S.WrapSecondColAppointment>
              </S.ItemAppointment>
            </S.Tabs.TabPane>
          ))}
        </S.Tabs>
      </S.WrapContent>
    </S.WrapContainer>
  );
}
