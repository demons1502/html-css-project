import React, { useRef } from "react";
import {
  Button,
  Carousel,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import logo from "../../../assets/images/manulife-logo.png";
import powered from "../../../assets/images/powered.png";
import rectangleSlide from "../../../assets/images/rectangle-slide.png";
import left from "../../../assets/images/icons/left.svg";
import right from "../../../assets/images/icons/right.svg";
const carousels = [
  {
    key: "slide_1",
    image: rectangleSlide,
    description:
      "Hỗ trợ đầy đủ toàn diện quá trình bán hàng, chăm sóc khách hàng và phát triển mạng lưới đại lý",
  },
  {
    key: "slide_2",
    image: rectangleSlide,
    description:
      "Hỗ trợ đầy đủ toàn diện quá trình bán hàng, chăm sóc khách hàng và phát triển mạng lưới đại lý",
  },
];
const Login = () => {
  const carouselRef = useRef(null);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Row className="login">
      <Col className="login__left" span={12}>
        <div className="login__left__container">
          <div className="login__left__box">
            <img className="login__left__logo" src={logo} />
          </div>
          <Form
            name="normal_login"
            className="login__left__form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="username" className="login__left__form__username">
              <Typography className="login__label">Tên đăng nhập</Typography>
              <Input className="login__input" placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item name="password">
              <Typography className="login__label">Mật khẩu</Typography>
              <Input.Password
                className="login__input"
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="checkbox-item login__checkbox">
                  <Typography className="login__label">
                    Ghi nhớ đăng nhập
                  </Typography>
                </Checkbox>
              </Form.Item>

              <Button className="login__forgotPassword" type="text">
                Quên mật khẩu?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login__button"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="login__left__bottom">
          <div className="login__left__bottom__logo">
            <img className="login__left__logo" src={powered} />
          </div>
          <Typography className="login__left__bottom__text">
            Powered by 1Way
          </Typography>
        </div>
      </Col>
      <Col span={12} className="login__right">
        <Carousel ref={carouselRef}>
          {carousels.map((i) => (
            <div key={i.key}>
              <div className="login__right__carosel">
                <div className="login__right__carosel__image">
                  <img className="login__left__logo" src={i.image} />
                  <div className="login__right__context">
                    <Typography className="login__right__description">
                      {i.description}
                    </Typography>
                    <div className="login__right__event">
                      <div
                        onClick={() => carouselRef.current.prev()}
                        className="login__right__event__left"
                      >
                        <img src={left} />
                      </div>

                      <div
                        onClick={() => carouselRef.current.next()}
                        className="login__right__event__right"
                      >
                        <img src={right} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default Login;
