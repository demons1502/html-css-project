import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getHistoryDetail } from "../../../slices/surveys";
import { formatDate } from "../../../helper/index";
import Table from '../../../components/common/TableNormal';

export const HistoryPopup = ({ historyHandler }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState([]);
  const { surveys, customers } = useSelector((state) => state);
  const [activeRow, setActiveRow] = useState(null);
  const { selectedCustomer } = customers;

  useEffect(() => {
    const historyData = surveys?.customerHistories?.map((history, i) => {
      return {
        surveyId: history?.surveyId,
        createdAt: formatDate(history?.createdAt),
        info: history?.hintName,
      };
    }).filter((item) => {
      return item.surveyId !== surveys?.data.surveyId && item.surveyId !== selectedCustomer?.surveyId
    });
    setDataTable(historyData);
  }, [surveys.customerHistories]);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const getSelectedSurvey = (id) => {
    setOpen(false);
    dispatch(getHistoryDetail(id));
  };

  const columns = [
    {
      title: 'Ngày',
      key: 'stt',
      dataIndex: 'createdAt'
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'info',
      key: 'info',
    }
  ];

  const content = (
    <div className="history-table-container">
      <Table
        dataSource={dataTable}
        columnTable={columns}
        rowClassName={(record) => (activeRow === record.surveyId ? 'active' : '')}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              getSelectedSurvey(record?.surveyId)
              setActiveRow(record.surveyId)
            }
          };
        }}
      />
    </div>
  );
  return (
    <Popover
      placement="bottomLeft"
      content={content}
      trigger="click"
      onOpenChange={handleOpenChange}
      overlayClassName="history-popover"
      visible={open}
      title="Lịch sử khảo sát"
    >
      <Button type="primary" className="btn-primary" htmlType="button" onClick={historyHandler}>
        {t("common.history")}
      </Button>
    </Popover>
  );
};