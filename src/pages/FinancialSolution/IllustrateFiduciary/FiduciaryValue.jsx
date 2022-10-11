import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { InputNumber } from '../../../components/common/Input/styles'

export const FiduciaryValue = ({ nameCustomer, data, setDataToSave }) => {
  const [investmentYear, setInvestmentYear] = useState(20);  //thoi gian uyu thac
  const [percentage, setPercentage] = useState(data?.values?.percantage || 6.850);  // muc ty suat dau tu minh hoa
  const [totalOfMoney, setTotalOfMoney] = useState(20000000);       //so tien dau tu them
  const [additionalInvestmentYear, setAdditionalInvestmentYear] = useState(10);   //so nam dau tu them
  const [bankRate, setBankRate] = useState(6)
  // const [valueColum, setValueColum] = useState(0)
  // console.log("investmentYear", investmentYear);
  // console.log("percentage", percentage);
  // console.log("totalOfMoney", totalOfMoney);
  // console.log("additionalInvestmentYear", additionalInvestmentYear);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  // console.log(data);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setDataToSave((prev) => {
      prev.additionalInvestmentYear = additionalInvestmentYear;
      prev.investmentYear = investmentYear;
      prev.percantage = percentage;
      prev.total = totalOfMoney;
      return ({
        ...prev
      })
    })
  }, [investmentYear, percentage, totalOfMoney, additionalInvestmentYear])

  const columnC = 30000       //fix if API return Arr
  const columnD = 20000       //fix if API return Arr
  const columnL = [85, 75, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const columnN = [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const columnJ7 = 8.70
  const columnR = [90, 75, 60, 45, 30, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const columnT = [50] // all  1ty< column C < 1.5ty =>100% , lon hon 1.5ty => 10%, nho hon 1ty=>50%

  // const setValueColumnT()=>{
  //   columnC.map
  // }

  const calculatorE = (i) => {
    return (columnC + columnD) * (i + 1)
  }

  var totalColumnF;
  const calculatorF0 = (i) => {
    totalColumnF = columnL[i] ? columnC * (100 - columnL[i]) * (100 + percentage) / 10000 : columnC * 100 * (100 + percentage) / 10000
    return totalColumnF.toFixed()
  }
  const calculatorF1 = (i) => {
    const formatL = (100 - columnL[i]) / 100
    totalColumnF = (Number(formatL * columnC) + Number(totalColumnF)) * 1.0685
    return totalColumnF.toFixed()
  }

  var totalColumnG;
  const calculatorG0 = (i) => {
    totalColumnG = columnD * (100 - columnN[i]) * (100 + columnJ7) / 10000
    return totalColumnG.toFixed()
  }
  const calculatorG1 = (i) => {
    let formatN = (100 - columnN[i]) / 100
    let formatJ7 = (100 + columnJ7) / 100
    totalColumnG = (Number(formatN * columnD) + Number(totalColumnG)) * formatJ7
    return totalColumnG.toFixed()
  }
  const calculatorH = (i) => {
    const result = Number(totalColumnG) + Number(totalColumnF)
    return result.toFixed()
  }
  const calculatorI0 = (i) => {
    let formatColumnR = columnR[i] / 100
    let columnQ = (columnC * columnR[i] - totalColumnF > 0) ? (columnC * formatColumnR) : (columnC * formatColumnR)
    const result = Number(totalColumnG) + ((Number(totalColumnF) - columnQ > 0) ? Number(totalColumnF) - columnQ : 0)
    return result.toFixed()
  }
  const calculatorI1 = (i) => {
    let formatColumnR = columnR[i] / 100
    let columnQ = (columnC * columnR[i] - totalColumnF > 0) ? (columnC * formatColumnR) : (columnC * formatColumnR)
    console.log('g',totalColumnG);
    console.log('f',totalColumnF);
    console.log('q',columnQ);

    const result = Number(totalColumnG) + ((Number(totalColumnF) - columnQ > 0) ? Number(totalColumnF) - columnQ : 0)



    return result.toFixed()

    // check column T to get % 
    // let totalI= Number(result) + (columnC * columnT)/100
    // return totalI.toFixed()
  }


  const calculatorJ = (i) => {
    let ii = i + 1
    let total = columnC + columnD
    let arr1 = []
    let result = 0
    let rate = (100 + bankRate) / 100
    for (let a = 1; a <= ii; a++) {
      arr1.push(total * (rate ** a))
    }
    arr1.map(item => {
      result = result + item
    })
    return result.toFixed();
  }

  const renderTable = (age, length) => {
    let arr = []
    for (let i = 0; i < length; i++) {
      let index = i
      arr.push(
        <tr key={i}>
          <td>{age + 1}</td>
          <td>{index + 1}</td>
          <td>{columnC}</td>
          <td>{columnD}</td>
          <td>{calculatorE(i)}</td>
          <td>{(i == 0) ? calculatorF0(i) : calculatorF1(i)}</td>
          <td>{(i == 0) ? calculatorG0(i) : calculatorG1(i)}</td>
          <td>{calculatorH(i)}</td>
          <td>{(i>1 && i<9) ? calculatorI1(i) : calculatorI0(i)}</td>
          <td>{calculatorJ(i)}</td>
        </tr>
      )
    }
    // console.log(arr);
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
          {/* const [investmentYear                //thoi gian uyu thac
            const [percentage              // muc ty suat dau tu minh hoa
            const [totalOfMoney,                 //so tien dau tu them
            const [additionalInvestmentYear     //so nam dau tu them */}
          {
            // (data?.age && investmentYear) ?
            renderTable(34, 20)
            // : <></>
          }
          {/* <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr>
          <tr>
            <td>31</td>
            <td>1</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
            <td>22.711.000</td>
          </tr> */}
        </tbody>
      </table>
    </Form>
  );
};
