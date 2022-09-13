import React from 'react';
import {useTranslation} from 'react-i18next';
import Participant from './components/participant';
import SurveyForm from './form/surveyForm';
import SurveyProcess from './components/surveyProcess';
import {Row, Col, Checkbox, Button, Empty, Popover} from 'antd';

export default function Survey() {
  const {t} = useTranslation();

  return (
    <div className="content-box survey">
      <h3>{t('survey.title')}</h3>
      <Row>
        <Col span={16}>
          <Row>
            <Participant />
            <SurveyForm />
          </Row>
        </Col>
        <SurveyProcess />
      </Row>
    </div>
  );
}
