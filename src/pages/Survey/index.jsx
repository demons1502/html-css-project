import { Button, Col, Layout, List, Row, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { sideBarMenuItems } from "../../assets/fake-data/QuyDuPhongData";
import SearchInputBox from "./SearchInputBox";
import ListDetails from "./ListDetails";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HistoryModal } from "./Modals/HistoryModal";
import TabMenu from "./Tabs/TabMenu";
const Survey = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [itemContent, setItemContent] = useState({});
  const [lists, setLists] = useState(sideBarMenuItems);
  const [payload, setPayload] = useState("");

  useEffect(() => {
    setItemContent(lists[0]);
  }, []);

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  };
  const historyHandler = () => {
    toggleHistoryModal();
  };
  const solutionHandler = () => {
    navigate("/advise/financial-solutions");
  };
  const counselHandler = () => {
    navigate("/advise/finance-consultant");
  };
  const appointmentHandler = () => {
    navigate("/appointment-management");
  };

  return (
    <Fragment>
      <div className="survey">
        <h3 className="title">{t("survey.title")}</h3>

        {/* survey-container start */}
        <div className="survey-container">
          <Row gutter={[16, 10]} justify="start" align="stretch">
            <Col lg={15} md={24} sm={24} xs={24}>
              <Layout.Content>
                {/* content-div-1 start  */}
                <div className="content-div-1">
                  <div className="container-left">
                    <div className="container-search-box">
                      <h1 className="container-search-box-header">
                        Người tham gia
                      </h1>
                      <SearchInputBox setPayload={setPayload}></SearchInputBox>
                    </div>

                    <List
                      dataSource={lists}
                      renderItem={(item, index) => (
                        <List.Item
                          onClick={() => setItemContent(item)}
                          className={`${item === itemContent ? "active" : ""}`}>
                          <Typography.Text ellipsis>
                            {item.title}
                          </Typography.Text>
                        </List.Item>
                      )}
                    />
                  </div>

                  {/* container-right start */}
                  <div className="container-right">
                    <div className="container-right-header">
                      <div>
                        <Button
                          type="primary"
                          className="btn-primary"
                          onClick={historyHandler}>
                          {t("common.history")}
                        </Button>
                      </div>
                      <div className="right">
                        <Button
                          type="primary"
                          className="btn-primary"
                          onClick={solutionHandler}>
                          {t("common.solution")}
                        </Button>
                        <Button
                          type="primary"
                          className="btn-primary"
                          onClick={counselHandler}>
                          {t("common.consultant")}
                        </Button>
                        <Button
                          type="primary"
                          className="btn-primary"
                          onClick={appointmentHandler}>
                          {t("common.booking")}
                        </Button>
                      </div>
                    </div>
                    <TabMenu />
                  </div>

                  {/* container-right end */}
                </div>

                {/* content-div-1 end  */}
              </Layout.Content>
            </Col>

            {/* manageContent start  */}
            <Col lg={9} md={24} sm={24} xs={24}>
              <Layout.Content className="manageContent">
                <div className="content-div-2">
                  <ListDetails />
                </div>
              </Layout.Content>
            </Col>
            {/* manageContent end  */}
          </Row>
        </div>
      </div>
      <HistoryModal
        isModalOpen={isHistoryModalOpen}
        toggleModal={toggleHistoryModal}
      />
    </Fragment>
  );
};

export default Survey;
