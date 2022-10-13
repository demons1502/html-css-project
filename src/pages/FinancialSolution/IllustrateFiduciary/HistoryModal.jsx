import { Modal, Empty, Popover, Spin } from "antd";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
// import Table from "../../../components/common/TableNormal";
// import { LOADING_STATUS } from '../../../ultis/constant';
import { useDispatch, useSelector } from "react-redux";
import { getIllustrationByIds } from "../../../slices/financialSolutions";

export const HistoryModal = ({ historyList, setIsHistory, setDate, setVersion }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [dataTable, setDataTable] = useState([]);
  const loading = useSelector((state) => state.loading.loading);
  useEffect(() => {
    let arr = []
    historyList.map((item, index) => {
      arr.push({
        key: item.id,
        date: item.createdAt,
        name: item.hintName,
        total: item.sumInsured
      })
    })
    setDataTable(arr)
  }, [historyList])
  const columns = [
    {
      title: t("Date"),
      dataIndex: "date",
      key: "0",
    },
    {
      title: t("Name"),
      dataIndex: "name",
      key: "1",
    },
    {
      title: t("Total Amount"),
      dataIndex: "total",
      key: "2",
    },
  ];
  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return (
        // <Spin spinning={loading === LOADING_STATUS.pending}>
        <Table dataSource={dataTable} columns={columns} pagination={false} size="small"
          onRow={(record, rowIndex) => {
            return {
              onClick: e => { dispatch(getIllustrationByIds(record.key)); setIsHistory(true); setDate(record.date); setVersion(record.versionFE ? record.versionFE : '1.0') }, // click row
            };
          }}
          scroll={{
            y: 400,
          }}
        />
        // </Spin>
      );
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

  return (
    <div style={{ width: '500px' }}>{table}</div>
  );
};
