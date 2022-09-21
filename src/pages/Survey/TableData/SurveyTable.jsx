import React, { useState, useMemo, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Empty, Form, Input } from "antd";
import { ClosingModal } from "../Modals/ClosingModal";
import TableCommon from "../../../components/common/TableNormal";
const CustomerServeyTable = () => {
  const { t } = useTranslation();
  const rowData = [...Array(10)].map((v, i) => {
    return {
      key: i + 1,
      type: "qũy đầu tư",
      infulence: 1,
      infulence2: false,
      infulence3: true,
      have: true,
      nothave: false,
      money: "12000",
      order: i + 1,
    };
  });

  console.log(rowData);
  const [dataTable, setDataTable] = useState(rowData);

  const handleCheckboxChangeFactory = (rowIndex, columnKey) => (event) => {
    const newCheckboxState = [...dataTable];
    newCheckboxState[rowIndex][columnKey] = event.target.checked;
    setDataTable(newCheckboxState);
  };

  const handleInput = (rowIndex, columnKey) => (event) => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[rowIndex][columnKey] = event.target.value;
    setDataTable(newCheckboxState);
  };

  const columns = [
    {
      title: "Nền tảng của sự giàu có",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "infulence level",
      children: [
        {
          title: "Rất quan trọng",
          dataIndex: "infulence1",
          key: "infulence1",
          render: (value, record, rowIndex) => (
            <Checkbox
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence1")}
            />
          ),
        },
        {
          title: "Quan trọng",
          dataIndex: "infulence2",
          key: "infulence2",
          render: (value, record, rowIndex) => (
            <Checkbox
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence2")}
            />
          ),
        },
        {
          title: "Ít quan trọng",
          dataIndex: "infulence3",
          key: "infulence3",
          render: (value, record, rowIndex) => (
            <Checkbox
              className="radius-5"
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "infulence3")}
            />
          ),
        },
      ],
    },
    {
      title: "Xây dựng vương quốc tài chính",
      children: [
        {
          title: "Chưa có",
          dataIndex: "nothave",
          key: "nothave",
          render: (value, record, rowIndex) => (
            <Checkbox
              className="radius-5"
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "nothave")}
            />
          ),
        },
        {
          title: "Đã có",
          dataIndex: "have",
          key: "have",
          render: (value, record, rowIndex) => (
            <Checkbox
              className="radius-5"
              checked={value}
              onChange={handleCheckboxChangeFactory(rowIndex, "have")}
            />
          ),
        },
        {
          title: "Số tiền (1000đ)",
          dataIndex: "money",
          key: "money",
          render: (value, record, rowIndex) => (
            <Input
              className="radius-10"
              value={value}
              onChange={handleInput(rowIndex, "money")}
            />
          ),
        },
      ],
    },
    {
      title: "TT ưu tiên",
      dataIndex: "order",
      key: "order",
      render: (value, record, rowIndex) => (
        <Input
          className="radius-10"
          value={value}
          onChange={handleInput(rowIndex, "order")}
        />
      ),
    },
  ];

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return (
        <TableCommon
          dataSource={dataTable}
          columnTable={columns}
          bordered></TableCommon>
      );
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);
  return (
    <Fragment>
      <h2 className="title">
        1. Những quỹ tài chính sau đây có ý nghĩa thế nào với gia đình anh/chị?
      </h2>
      <div className="">{table}</div>
      <div className="container-right-submit">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Không còn tiềm năng</Checkbox>
        </Form.Item>
        <Form.Item>
          {/* <Button type="primary" htmlType="submit" className="btn-primary">
            {t("survey.save")}
          </Button> */}
          <ClosingModal />
        </Form.Item>
      </div>
    </Fragment>
  );
};

export default CustomerServeyTable;
