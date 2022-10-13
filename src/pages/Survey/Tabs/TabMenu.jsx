import { Tabs } from "antd";
import React from "react";
import SurveyTable from "../TableData/SurveyTable";
import { PersonalInfoForm } from "../TableData/PersonalInfoForm";

const TabMenu = () => {
  const items = [
    { label: 'I. Ý kiến khảo sát', key: '1', children: <SurveyTable /> },
    { label: 'II. Thông tin cá nhân', key: '2', children: <PersonalInfoForm /> },
  ];
  
  return <Tabs items={items} />;
};

export default TabMenu;
