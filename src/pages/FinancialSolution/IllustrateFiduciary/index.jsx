import { Tabs, Popover } from "antd";
import { Button } from "../../../components/styles";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageBack from "../../../assets/images/financial/PageBack";
import Calender from "../../../assets/images/icons/components/calender";
import Clock from "../../../assets/images/icons/components/Clock";
import User from "../../../assets/images/icons/components/user";
import messageIcon from "../../../assets/images/icons/message-white.svg";
import { FiduciaryValue } from "./FiduciaryValue";
import { SummaryOfBenefits } from "./SummaryOfBenefits";
import { HistoryModal } from "./HistoryModal";
import { ClosingModal } from "./ClosingModal";
import { SaveConfirmation } from "./SaveConfirmation";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerContracts, postSaveFinances } from "../../../slices/financialSolutions";

const IllustrateFiduciary = () => {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [contract, setContract] = useState([]) // contract of user
  const [dataToSave, setDataToSave] = useState({...location?.state,investmentYear: '', additionalInvestmentYear:'', hideName: ''} || {})
  const [callSave, setCallSave] = useState(false)
  const [date, setDate] = useState(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  })

  useEffect(() => {
    if (callSave) {
      let data={
        customerApptRecordId: dataToSave.userSelected.customerApptRecordId,
        fundType: dataToSave.typeFund,
        isPotential: (dataToSave.values.isPotential == undefined) ? "false" : 'true',
        result: "string",
        hintName: dataToSave.hideName,
        version:"string",
        sumInsured: dataToSave.total,
        baseYear: dataToSave.additionalInvestmentYear,
        basePremium: 20000, //???
        annualBasePremiums: [ 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000 ], //???
        CISupport: 10000, //???
        inpatient: "SILVER", //???
        outpatient: "TITAN",//???
        premiumSupport: "no", //???
        topUpPremium: 10000, //???
        topUpYears: 10, //???
        annualTopUpPremiums: [ 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000 ],//???
        rate: dataToSave.investmentYear,
        interestRate: dataToSave.investmentYear.toString(),
        expensePerMonth: dataToSave.values.amount,
      }
      dispatch(postSaveFinances(data))
      //call api save
      setCallSave(false)
    }
  }, [callSave])
  // const customerId = useSelector((state) => state.financialSolution.customerSelect)
  // const customerContract = useSelector((state) => state.financialSolution.customerContract)

  // useEffect(() => {
  //   dispatch(getCustomerContracts())
  // }, [customerId])

  // useEffect(() => {
  //   console.log(customerContract.customers);
  //   if (customerContract?.customers?.length > 0 && customerId) {
  //     const data = customerContract.customers.find(item => {
  //       return item.customerId == customerId
  //     })
  //     setContract(data)
  //   }
  // }, [customerContract])

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  }

  useEffect(() => {
    console.log(dataToSave);
  }, [dataToSave])

  const sendEmail = () => {
    // window.location.href =
    //   "https://mail.google.com/mail/u/0/#inbox?compose=new";
  };
  const handleContractBtn = () => {
    navigate('/advise/contract-management')
  }
  const tabExtra = () => {
    return (
      <>
        <div className="tab-extra">
          <div className="date">
            <Calender />
            <p>
              Ngày minh họa: <span>{date}</span>
            </p>
          </div>
          <div className="user">
            <User />
            <p>
              Khách hàng: <span>{location?.state?.userSelected?.title}</span>
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
            <div className="finance-btn-wrapper">
              <Popover
                title="Lịch sử tư vấn"
                open={isHistoryModalOpen}
                placement="bottomRight"
                onOpenChange={(e) => setIsHistoryModalOpen(e)}
                content={<HistoryModal />}
                trigger="click"
              >
                <Button
                  // type="primary"
                  style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  htmlType="button"
                  className="btn-primary-outline"
                  block
                  onClick={() => toggleHistoryModal()}
                >
                  <div className="btn-icon">
                    <Clock />
                  </div>
                  <span> Lịch sử</span>
                </Button>
              </Popover>
            </div>

            <div className="finance-btn-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary finance-btn-small"
                block
                onClick={handleContractBtn}
              >
                Chốt hợp đồng
              </Button>
            </div>

            <div className="finance-btn-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary finance-btn-small"
                block
                onClick={sendEmail}
              >
                <img src={messageIcon} alt="gmail btn" className="img-icon" />
                Gửi email
              </Button>
            </div>

            <div className="finance-btn-wrapper-sm">
              {/* <Button
                type="primary"
                htmlType="submit"
                className="btn-primary finance-btn-small"
                block
              >
                Lưu
              </Button> */}
              <ClosingModal setCallSave={(e)=>setCallSave(e)} setDataToSave={(e)=>{setDataToSave(e)}}/>
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="1" tabBarExtraContent={tabExtra()}
          items={[
            {
              label: 'Minh họa giá trị ủy thác',
              key: '1',
              children: <FiduciaryValue data={dataToSave} setDataToSave={(e)=>setDataToSave(e)}/>,
            },
            {
              label: 'Tóm tắt quyền lợi bằng bông hoa',
              key: '2',
              children: <SummaryOfBenefits />,
            }]}
        />
      </div>
    </>
  );
};

export default IllustrateFiduciary;
