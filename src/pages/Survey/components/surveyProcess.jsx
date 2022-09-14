import React from 'react';
import { useTranslation } from 'react-i18next';
import Title from '../../../components/Title';
import { Row, Col, Checkbox, Button, Empty, Popover } from 'antd';
import LeftArrow from '../../../assets/images/icons/left-arrow.svg';
import RightArrow from '../../../assets/images/icons/right-arrow.svg';

export default function SurveyProcess() {
  const { t } = useTranslation();

  return (
    <>
      <Col span={8} className='survey__right'>
        <Title title={t('survey.process')}></Title>
        <div className='survey__right--content'>
          <Button type='primary' className='btn-primary'>
            {t('Lời thoại 1')}
          </Button>
          <p className='survey__right--content--text'>{t('survey.process')}</p>
        </div>
        <div className='survey__right--action'>
          <div className='survey__right--action--right'>
            <span>Trước</span>
            <span>
              <Button icon={<img src={LeftArrow} alt='' />}></Button>
            </span>
            <span>
              <Button icon={<img src={RightArrow} alt='' />}></Button>
            </span>
            <span>Tiếp</span>
          </div>
        </div>
      </Col>
    </>
  );
}
