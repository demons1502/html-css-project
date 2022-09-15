import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next';
import PageBack from '../../../assets/images/financial/PageBack';
import ListCalculation from './ListCalculation';
import ListDetails from './ListDetails';
import ListSearch from './ListSearch'

const QuyDuPhong = () => {
  const { t } = useTranslation();

  return (
    <div className="quy_du_phong">
      <div className="page_title">
        <PageBack />
        <h4>Quỹ dự phòng</h4>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card className='card_searchcal'>
            <Row>
              <ListSearch />
              <ListCalculation />
            </Row>
          </Card>
        </Col>
        <ListDetails />
      </Row>
    </div>
  )
}

export default QuyDuPhong