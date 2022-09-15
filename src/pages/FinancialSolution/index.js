import React from "react";
import { Card, Col, Image, Row, Anchor } from "antd";
import { useTranslation } from "react-i18next";
import Title from "../../components/Title";
import IMG1 from "../../assets/images/financial/1.jpeg";
import IMG2 from "../../assets/images/financial/2.jpeg";
import IMG3 from "../../assets/images/financial/3.jpeg";
import IMG4 from "../../assets/images/financial/4.jpeg";
import IMG5 from "../../assets/images/financial/5.jpeg";
import IMG6 from "../../assets/images/financial/6.jpeg";
import { Link } from "react-router-dom";

const FinancialSolution = () => {
  const { t } = useTranslation();
  const dataSource = [
    {
      key: 1,
      title: "Quỹ Hưu trí",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG1,
      link: "/retirement",
    },
    {
      key: 2,
      title: "Quỹ khởi nghiệp",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG2,
      link: "/startup-fund",
    },
    {
      key: 3,
      title: "Quỹ thừa kế",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG3,
      link: "/inheritance-fund",
    },
    {
      key: 4,
      title: "Quỹ dự phòng",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG4,
      link: "/quy-du-phong",
    },
    {
      key: 5,
      title: "Quỹ giáo dục",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG5,
      link: "/image-details",
    },
    {
      key: 6,
      title: "Quỹ sức khỏe",
      dec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: IMG6,
      link: "/image-details",
    },
  ];
  return (
    <>
      <Title title={t("financial solution.title")}></Title>
      <Row gutter={[24, 24]}>
        {dataSource.map((item) => (
          <Col span={24} lg={8} key={item.key} className="financial">
            <Card className="financial__card">
              <Link to={item.link}>
                <Image
                  src={item.image}
                  className="financial__image"
                  preview={false}
                />
              </Link>
              <div className="financial__content">
                <Link to={item.link}>
                  <h3 className="financial__title">{item.title}</h3>
                </Link>
                <p className="financial__dec">{item.dec}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FinancialSolution;
