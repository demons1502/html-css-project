import { Tabs, Popover } from "antd";
import { Button } from "../../../components/styles";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getCustomerContracts } from "../../../slices/financialSolutions";

const IllustrateFiduciary = ({route}) => {
  // const {values} = route.params
  // console.log(values);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [contract, setContract] = useState([]) // contract of user
  const [date, setDate] = useState(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  })
  const customerId = useSelector((state) => state.financialSolution.customerSelect)
  const customerContract = useSelector((state) => state.financialSolution.customerContract)

  useEffect(() => {
    dispatch(getCustomerContracts())
  }, [customerId])

  useEffect(() => {
    console.log(customerContract.customers);
    if (customerContract?.customers?.length > 0 && customerId) {
      const data = customerContract.customers.find(item => {
        return item.customerId == customerId
      })
      setContract(data)
    }
  }, [customerContract])

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  }
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
              Khách hàng: <span>{contract.fullname}</span>
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
              <ClosingModal />
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="1" tabBarExtraContent={tabExtra()}
          items={[
            {
              label: 'Minh họa giá trị ủy thác',
              key: '1',
              children: <FiduciaryValue />,
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