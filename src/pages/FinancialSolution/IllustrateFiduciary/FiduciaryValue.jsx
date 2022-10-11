import React, { useState, useEffect, useLayoutEffect } from "react";
import { Form } from "antd";
import { InputNumber } from '../../../components/common/Input/styles'
import { formatDataNumber } from "../../../helper";


export const FiduciaryValue = ({ nameCustomer, data, setDataToSave, preparedIllustration }) => {
  const [investmentYear, setInvestmentYear] = useState(20);  //thoi gian uyu thac
  const [percentage, setPercentage] = useState(preparedIllustration?.rate || 6.850);  // muc ty suat dau tu minh hoa
  const [totalOfMoney, setTotalOfMoney] = useState(20000000);       //so tien dau tu them
  const [additionalInvestmentYear, setAdditionalInvestmentYear] = useState(10);   //so nam dau tu them
  const [bankRate, setBankRate] = useState(6)
  const [columnC, setColumnC] = useState(preparedIllustration?.annualBasePremiums || [])
  const [columnD, setColumnD] = useState(preparedIllustration?.annualTopUpPremiums || [])
  const [columnT, setColumnT] = useState([50])
  useEffect(() => {
    setColumnC(preparedIllustration?.annualBasePremiums)
    setColumnD(preparedIllustration?.annualTopUpPremiums)
  }, [preparedIllustration])

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  // console.log(data);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
    let arr=[...columnD]
    if(columnD.length<additionalInvestmentYear){
      const lengthOfArr= investmentYear < additionalInvestmentYear ? investmentYear : additionalInvestmentYear
      for(let i=columnD.length; i< lengthOfArr; i++){
        arr.push(totalOfMoney)
      }
    }
    else if(columnD.length>additionalInvestmentYear){
      arr.splice(0,columnD.length - additionalInvestmentYear)
    }
    setColumnD(arr)
  },[additionalInvestmentYear])

  useEffect(()=>{
    let arr = Array.from({ length: columnD.length }, (_, i) => i=totalOfMoney)
    setColumnD(arr)
  },[totalOfMoney])

  useEffect(() => {
    setDataToSave((prev) => {
      prev.additionalInvestmentYear = additionalInvestmentYear;
      prev.investmentYear = investmentYear;
      prev.percentage = percentage;
      prev.total = totalOfMoney;
      prev.annualBasePremiums= columnC;
      prev.annualTopUpPremiums= columnD;
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
  const inputColumnD = (e, i) => {
    console.log(e, i);
  }
  const renderTable = (age, length) => {
    let arr = []
    for (let i = 0; i < length; i++) {
      let index = i
      arr.push(
        <tr key={i}>
          <td>{age + 1 + i}</td>
          <td>{index + 1}</td>
          <td>{columnC[i]}</td>
          <td>{columnD[i]}</td>
          {/* <td>{
            <InputNumber controls={false} type="number"
              value={columnD[i]} onChange={(e)=>inputColumnD(e)}
              style={{ width: "120px", backgroundColor: 'white' }}
              // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          }</td> */}
          <td>{calculatorE(i)}</td>
          <td>{(i == 0) ? calculatorF0(i) : calculatorF1(i)}</td>
          <td>{(i == 0) ? calculatorG0(i) : calculatorG1(i)}</td>
          <td>{calculatorH(i)}</td>
          <td>{(i > 1 && i < 9) ? calculatorI1(i) : calculatorI0(i)}</td>
          <td>{(i == 0) ? calculatorJ0(i) : calculatorJ1(i)}</td>
        </tr>
      )
    }
    return arr
  }

  return (
    <Form
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
                  onChange={(e) => setTotalOfMoney(e)}
                />
              </Form.Item>
            </th>
            <th>
              <Form.Item name="additional_investment_year">
                <InputNumber type="number"
                  controls={false}
                  max={20}
                  style={{ textAlign: 'center', width: 152 }}
                  className="form-input-text"
                  placeholder="0"
                  onChange={(e) => setAdditionalInvestmentYear(e)}
                />
              </Form.Item>
            </th>
          </tr>
          <tr>
            <th rowSpan={3}>
              <span className="merge-heading"> Tuổi</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Năm HĐ</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Phí BH cơ bản</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Phí BH đóng thêm</span>
            </th>
            <th rowSpan={3}>
              <span className="merge-heading"> Tổng phí BH lũy kế</span>
            </th>
            <th colSpan={4}>
              Mức tỷ suất đầu tư với lãi suất minh họa - Quỹ Tăng Trưởng
            </th>
            <th colSpan={4}>Các kênh đầu tư khác</th>
          </tr>

          <tr>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK cơ bản</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK đóng thêm</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> GTTK hợp đồng</span>
            </th>
            <th rowSpan={2}>
              <span className="merge-heading"> Giá trị hoàn lại</span>
            </th>
            <th>Ngân hàng</th>
          </tr>
          <tr>
            <th><InputNumber type="number" value={bankRate} onChange={(e) => setBankRate(e)} style={{ width: "152px", backgroundColor: 'white' }} /></th>
          </tr>
        </thead>
        <tbody>
          {
            (data?.age && preparedIllustration) ?
              renderTable(34, investmentYear)
              : <></>
          }
        </tbody>
      </table>
    </Form>
  );
};
