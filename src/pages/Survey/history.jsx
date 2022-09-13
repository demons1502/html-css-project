import {useTranslation} from 'react-i18next';
import {Row} from 'antd';
import Participant from './components/participant';
import SurveyProcess from './components/surveyProcess';
import SurveyView from './components/surveyView';

export default function SurveyHistory() {
  const {t} = useTranslation();

  return (
    <div className="content-box finance-consultant">
      <h3>{t('finance consultant.title')}</h3>
      <Row>
        <Participant />
        <SurveyView />
        <SurveyProcess />
      </Row>
    </div>
  );
}
