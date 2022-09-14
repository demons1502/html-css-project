import { Card, Col, Image, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Title from '../../components/Title'
import IMG1 from '../../assets/images/financial/1.jpeg'
import IMG2 from '../../assets/images/financial/2.jpeg'
import IMG3 from '../../assets/images/financial/3.jpeg'
import IMG4 from '../../assets/images/financial/4.jpeg'
import IMG5 from '../../assets/images/financial/5.jpeg'
import IMG6 from '../../assets/images/financial/6.jpeg'

const FinancialSolution = () => {
  const { t } = useTranslation();
  const dataSource = [
    {
      key: 1,
      title: 'Quỹ Hưu trí',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG1,
    },
    {
      key: 2,
      title: 'Quỹ khởi nghiệp',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG2,
    },
    {
      key: 3,
      title: 'Quỹ thừa kế',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG3,
    },
    {
      key: 4,
      title: 'Quỹ dự phòng',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG4,
    },
    {
      key: 5,
      title: 'Quỹ giáo dục',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG5,
    },
    {
      key: 6,
      title: 'Quỹ sức khỏe',
      dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: IMG6,
    }
  ]
  return (
    <>
      <Title title={t("financial solution.title")}></Title>
      <Row gutter={[24, 24]}>
        {/*<Col span={24}>*/}
        {/*  <h3>{t("financial solution.title")}</h3>*/}
        {/*</Col>*/}
        {dataSource.map((item) => (
          <Col span={24} lg={8} key={item.key} className="financial">
            <Card className='financial__card'>
              <Image src={item.image} className='financial__image' preview={false} />
              <div className='financial__content'>
                <h3 className='financial__title'>{item.title}</h3>
                <p className='financial__dec'>{item.dec}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default FinancialSolution