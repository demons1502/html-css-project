import { Button, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PageBack from "../../../assets/images/financial/PageBack";
import Calender from "../../../assets/images/icons/calender";
import Clock from "../../../assets/images/icons/Clock";
import User from "../../../assets/images/icons/user";
import { MinhHoaGiaTri } from "./MinhHoaGiaTri";
import { TomTatQuyen } from "./TomTatQuyen";

const MinhHoaGiaTriUyThac = () => {
  const tabExtra = () => {
    return (
      <>
        <div className="tab-extra">
          <div className="date">
            <Calender />
            <p>
              Ngày minh họa: <span>14/07/2022</span>
            </p>
          </div>
          <div className="user">
            <User />
            <p>
              Khách hàng: <span>Kathryn Murphy</span>
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="minh-hoa-gia">
        <div className="minh-header">
          <Link to="/advise/financial-solutions">
            <PageBack />
          </Link>
          <div className="minh-header_btns">
            <Button className="historyButton" icon={<Clock />}>
              Lịch sử
            </Button>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Chốt hợp đồng
            </Button>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Gửi email
            </Button>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Lưu
            </Button>
          </div>
        </div>
        <Tabs defaultActiveKey="1" tabBarExtraContent={tabExtra()}>
          <Tabs.TabPane tab="Minh họa giá trị ủy thác" key="1">
            <MinhHoaGiaTri />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tóm tắt quyền lợi bằng bông hoa" key="2">
            <TomTatQuyen />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default MinhHoaGiaTriUyThac;
