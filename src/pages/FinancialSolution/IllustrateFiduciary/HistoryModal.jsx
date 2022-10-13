import { Modal, Empty, Popover } from "antd";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import  { Table} from "antd";
// import Table from "../../../components/common/TableNormal";
import { useDispatch } from "react-redux";
import { getIllustrationByIds } from "../../../slices/financialSolutions";

export const HistoryModal = ({ historyList, setIsHistory, setDate }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [dataTable, setDataTable] = useState([]);

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
        <Table dataSource={dataTable} columns={columns} pagination={false} size="small"
          onRow={(record, rowIndex) => {
            return {
              onClick: e => { dispatch(getIllustrationByIds(record.key)); setIsHistory(true); setDate(record.date)}, // click row
            };
          }}
          scroll={{
            y: 400,
          }}
        />
      );
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

  return (
    <div style={{ width: '500px' }}>{table}</div>
  );
};
