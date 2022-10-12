import React, { useState, useEffect, useLayoutEffect } from "react";
import { Form, Popconfirm, Table, Typography } from "antd";
import { InputNumber } from '../../../components/common/Input/styles'
import { formatDataNumber } from "../../../helper";


export const FiduciaryValue = ({ nameCustomer, data, setDataToSave, preparedIllustration }) => {
  const [investmentYear, setInvestmentYear] = useState(20);  //thoi gian uyu thac
  const [percentage, setPercentage] = useState(preparedIllustration?.rate || 6.850);  // muc ty suat dau tu minh hoa
  const [totalOfMoney, setTotalOfMoney] = useState(20000000);       //so tien dau tu them
  const [additionalInvestmentYear, setAdditionalInvestmentYear] = useState(10);   //so nam dau tu them
  const [dataTable, setDataTable] = useState([])
  const [bankRate, setBankRate] = useState(6)
  const [columnC, setColumnC] = useState(preparedIllustration?.annualBasePremiums || [])
  const [columnD, setColumnD] = useState(preparedIllustration?.annualTopUpPremiums || [])
  const [columnT, setColumnT] = useState([50])

  const [form] = Form.useForm();
  useEffect(() => {
    let lengthColumnD = columnD.length
    if (lengthColumnD != additionalInvestmentYear) {
      setAdditionalInvestmentYear(lengthColumnD)
      form.setFieldValue('additional_investment_year', lengthColumnD)
    }
  }, [columnD])

  useEffect(() => {
    setColumnC(preparedIllustration?.annualBasePremiums)
    setColumnD(preparedIllustration?.annualTopUpPremiums)
    form.setFieldValue('amount_of_money', 20000000)
    setTotalOfMoney(20000000)
    form.setFieldValue('additional_investment_year', preparedIllustration.topUpYears)
    setAdditionalInvestmentYear(preparedIllustration.topUpYears)
  }, [preparedIllustration])

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const inputColumnD = (record, index) => {
    let arr = [...columnD]
    if (record == null) {
      arr[index.key] = 0
      // form.setFieldValue('additional_investment_year', additionalInvestmentYear - 1)
      // setAdditionalInvestmentYear(additionalInvestmentYear - 1)
    }
    else {
      arr[index.key] = record
    }
    setColumnD(arr)
  }

  const inputColumnC = (record, index) => {
    let arr = [...columnC]
    if (record == null) {
      arr[index.key] = 0

    }
    else {
      arr[index.key] = record
    }
    setColumnC(arr)
  }

  const columns = [
    {
      title: 'Tuổi',
      align: 'center',
      dataIndex: 'age',
      key: '0',
    },
    {
      title: 'Năm HĐ',
      align: 'center',
      dataIndex: 'index',
      key: '1'
    },
    {
      title: 'Phí BH cơ bản',
      align: 'center',
      dataIndex: 'columnC',
      key: '2',
      render: (record, index) =>
        <div key={index}>
          <InputNumber controls={false} type="number" className="input_columnD" min={0}
            value={columnC[index.key]} onChange={(record) => { inputColumnC(record, index) }}
            style={{ width: "120px", backgroundColor: 'white' }}
          // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </div>
    },
    {
      title: 'Phí BH đóng thêm',
      align: 'center',
      dataIndex: 'columnD',
      key: '3',
      render: (record, index) =>
        <div key={index}>
          <InputNumber controls={false} type="number" className="input_columnD" min={0}
            value={columnD[index.key]} onChange={(record) => { inputColumnD(record, index) }}
            style={{ width: "120px", backgroundColor: 'white' }}
          // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </div>
    },
    {
      title: 'Tổng phí BH luỹ kế',
      align: 'center',
      dataIndex: 'columnE',
      key: '4',
    },
    {
      title: 'Mức tỷ suất đầu tư với lãi suất minh hoạ - Quỹ Tắng Trưởng',
      children: [
        {
          title: 'GTTK cơ bản',
          align: 'center',
          dataIndex: 'columnF',
          key: '5',
          width: 150,
        },
        {
          title: 'GTTK đóng thêm',
          align: 'center',
          dataIndex: 'columnG',
          key: '6',
          width: 150,
        },
        {
          title: 'GTTK hợp đồng',
          align: 'center',
          dataIndex: 'columnH',
          key: '7',
          width: 150,
        },
        {
          title: 'Giá trị hoàn lại',
          align: 'center',
          dataIndex: 'columnI',
          key: '8',
          width: 150,
        },
      ]
    },
    {
      title: 'Các kênh đầu tư khác',
      align: "center",
      children: [
        {
          title: 'Ngân hàng',
          align: "center",
          children: [
            {
              title: <InputNumber type="number" value={bankRate} onChange={(e) => setBankRate(e)} style={{ width: "152px", backgroundColor: 'white' }} />,
              align: 'center',
              dataIndex: 'columnJ',
              key: '9'
            },
          ]
        },
      ]
    }
  ]

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    let arr = [...columnD]
    if (columnD.length < additionalInvestmentYear) {
      const lengthOfArr = investmentYear < additionalInvestmentYear ? investmentYear : additionalInvestmentYear
      for (let i = columnD.length; i < lengthOfArr; i++) {
        arr.push(totalOfMoney)
      }
    }
    else if (columnD.length > additionalInvestmentYear) {
      arr.splice(0, columnD.length - additionalInvestmentYear)
    }
    setColumnD(arr)
  }, [additionalInvestmentYear])

  useEffect(() => {
    let arr = Array.from({ length: columnD.length }, (_, i) => i = totalOfMoney)
    setColumnD(arr)
  }, [totalOfMoney])

  useEffect(() => {
    setDataToSave((prev) => {
      prev.additionalInvestmentYear = additionalInvestmentYear;
      prev.investmentYear = investmentYear;
      prev.percentage = percentage;
      prev.total = totalOfMoney;
      prev.annualBasePremiums = columnC;
      prev.annualTopUpPremiums = columnD;
      return ({
        ...prev
      })
    })
  }, [investmentYear, percentage, totalOfMoney, additionalInvestmentYear, columnC, columnD])

  const columnL = [85, 75, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const columnN = [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const columnJ7 = 8.70
  const columnR = [90, 75, 60, 45, 30, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const setValueColumnT = () => {
    let result = 0
    columnC.map(item => {
      result += item
    })
    if (1000000000 < result < 1500000000) {
      setColumnT([100])
    }
    else if (result < 1000000000) {
      setColumnT([50])
    }
    else setColumnT([150])
  }

  useEffect(() => {
    setValueColumnT()
  }, [columnC, columnD])

  const calculatorE = (i) => {
    return columnD[i] ? formatDataNumber((columnC[i] + columnD[i]) * (i + 1)) : formatDataNumber(columnC[i] * (i + 1))
  }

  var totalColumnF;
  const calculatorF0 = (i) => {
    totalColumnF = columnL[i] ? columnC[i] * (100 - columnL[i]) * (100 + percentage) / 10000 : columnC[i] * 100 * (100 + percentage) / 10000
    return formatDataNumber(totalColumnF.toFixed())
  }
  const calculatorF1 = (i) => {
    const formatL = (100 - columnL[i]) / 100
    totalColumnF = (Number(formatL * columnC[i]) + Number(totalColumnF)) * (100 + percentage) / 100
    return formatDataNumber(totalColumnF.toFixed())
  }

  var totalColumnG;
  const calculatorG0 = (i) => {
    totalColumnG = columnD[i] ? columnD[i] * (100 - columnN[i]) * (100 + columnJ7) / 10000 : (100 + columnJ7) / 10000
    return formatDataNumber(totalColumnG.toFixed())
  }
  const calculatorG1 = (i) => {
    let formatN = (100 - columnN[i]) / 100
    let formatJ7 = (100 + columnJ7) / 100
    totalColumnG = columnD[i] ? (Number(formatN * columnD[i]) + Number(totalColumnG)) * formatJ7 : Number(totalColumnG) * formatJ7
    return formatDataNumber(totalColumnG.toFixed())
  }
  const calculatorH = (i) => {
    const result = Number(totalColumnG) + Number(totalColumnF)
    return formatDataNumber(result.toFixed())
  }
  const calculatorI0 = (i) => {
    let formatColumnR = columnR[i] / 100
    let columnQ = (columnC[i] * columnR[i] - totalColumnF > 0) ? (columnC[i] * formatColumnR) : (columnC[i] * formatColumnR)
    const result = Number(totalColumnG) + ((Number(totalColumnF) - columnQ > 0) ? Number(totalColumnF) - columnQ : 0)
    return formatDataNumber(result.toFixed())
  }
  const calculatorI1 = (i) => {
    let formatColumnR = columnR[i] / 100
    let columnQ = (columnC[i] * columnR[i] - totalColumnF > 0) ? (columnC[i] * formatColumnR) : (columnC[i] * formatColumnR)
    const result = Number(totalColumnG) + ((Number(totalColumnF) - columnQ > 0) ? Number(totalColumnF) - columnQ : 0)



    return formatDataNumber(result.toFixed())

    // check column T to get % 
    // let totalI= Number(result) + (columnC[i] * columnT)/100
    // return totalI.toFixed()
  }

  var totalBankInterest;
  const calculatorJ0 = (i) => {
    if (i == 0) {
      let rate = (100 + bankRate) / 100
      let total = columnD[i] ? columnC[i] + columnD[i] : columnC[i]
      const result = total * rate
      totalBankInterest = result
      return formatDataNumber(result.toFixed())
    }
  }

  const calculatorJ1 = (i) => {
    let rate = (100 + bankRate) / 100
    let total = columnD[i] ? columnC[i] + columnD[i] : columnC[i]
    const result = (total + totalBankInterest) * rate
    totalBankInterest = result
    return formatDataNumber(result.toFixed())
  }

  var arr = []
  const renderTable = (age, length) => {

    for (var i = 0; i < length; i++) {
      var index = i
      arr.push(
        {
          key: i,
          age: age + 1 + i,
          index: index + 1,
          columnC: columnC[i],
          columnD: columnD[i],
          columnE: calculatorE(i),
          columnF: (i == 0) ? calculatorF0(i) : calculatorF1(i),
          columnG: (i == 0) ? calculatorG0(i) : calculatorG1(i),
          columnH: calculatorH(i),
          columnI: (i > 1 && i < 9) ? calculatorI1(i) : calculatorI0(i),
          columnJ: (i == 0) ? calculatorJ0(i) : calculatorJ1(i),
        }
      )
    }
  }
  renderTable(data.age, investmentYear)
  return (
    <Form form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        investment_year: investmentYear,
        percent: percentage,
        amount_of_money: totalOfMoney,
        additional_investment_year: additionalInvestmentYear
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <table className="minh_table">
        <thead>
          <tr className="table_top">
            <th colSpan={4}>THỜI GIAN ỦY THÁC</th>
            <th>
              <Form.Item name="investment_year">
                <InputNumber type="number"
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  min={1}
                  controls={false}
                  placeholder="0"
                  onChange={(e) => setInvestmentYear(e)}
                />
              </Form.Item>
            </th>
            <th rowSpan={2} colSpan={3}>
              <span className="invest_more">đầu tư thêm</span>
            </th>
            <th>Số tiền</th>
            <th>Số năm đầu tư thêm</th>
          </tr>
          <tr className="table_top">
            <th colSpan={4}>Mức tỷ suất đầu tư minh họa</th>
            <th>
              <Form.Item name="percent">
                <InputNumber controls={false} type="number"
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  placeholder="0"
                  onChange={(e) => setPercentage(e)}
                />
              </Form.Item>
            </th>
            <th>
              <Form.Item name="amount_of_money">
                <InputNumber controls={false}
                  style={{ width: 152, textAlign: 'center' }}
                  className="form-input-text"
                  placeholder="0"
                  formatter={(e) =>
                    `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(e) => e.replace(/\$\s?|(,*)/g, "")}
                  value={totalOfMoney}
                  onChange={(e) => setTotalOfMoney(e)}
                />
              </Form.Item>
            </th>
            <th>
              <Form.Item name="additional_investment_year">
                <InputNumber type="number"
                  controls={false}
                  max={investmentYear}
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  placeholder="0"
                  value={additionalInvestmentYear}
                  onChange={(e) => setAdditionalInvestmentYear(e)}
                />
              </Form.Item>
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <Table columns={columns} dataSource={arr} bordered size="small" pagination={false} />
    </Form>
  );
};
