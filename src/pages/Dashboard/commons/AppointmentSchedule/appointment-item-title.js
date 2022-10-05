import { Col, Row, Slider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../../../components/common/Filter';
import { options } from '../../constants';
import * as S from '../../styles';

export default function AppointmentItemTitle(props) {
  const { t } = useTranslation();
  const { done, total } = props.slider;
  const { select, setSelect } = props;

  return (
    <S.WrapTitle $toggle $height="auto" $padding="19px 23px 0px">
      <Col flex={1}>
        <S.Title $nonePadding>{t('dashboard-page.appointment-schedule')}</S.Title>
      </Col>
      <Col flex="auto">
        <Row>
          <S.WrapTextCenter span={24}>
            Hoàn thành {done}/{total}
          </S.WrapTextCenter>
          <Col span={24}>
            <Slider max={total} value={done} />
          </Col>
        </Row>
      </Col>
      <Col flex={1}>
        <Filter options={options} setPayload={setSelect} optionsFilter={select}></Filter>
      </Col>
    </S.WrapTitle>
  );
}
