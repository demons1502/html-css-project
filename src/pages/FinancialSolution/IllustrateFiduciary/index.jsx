import { Tabs, Popover } from 'antd';
import { Button } from '../../../components/styles';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageBack from '../../../assets/images/financial/PageBack';
import Calender from '../../../assets/images/icons/components/calender';
import Clock from '../../../assets/images/icons/components/Clock';
import User from '../../../assets/images/icons/components/user';
import messageIcon from '../../../assets/images/icons/message-white.svg';
import { FiduciaryValue } from './FiduciaryValue';
import { SummaryOfBenefits } from './SummaryOfBenefits';
import { HistoryModal } from './HistoryModal';
import { ClosingModal } from './ClosingModal';
import { SaveConfirmation } from './SaveConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCustomerContracts,
  postSaveFinances,
  getFinanceSolution,
  updateSelectCustomer,
  getCustomerByIdAndType,
  getPreparedIllustrations,
  getIllustrationHistoryS,
} from '../../../slices/financialSolutions';

const IllustrateFiduciary = () => {
  const location = useLocation();
  const { total, typeFund, userSelected, values } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [callSave, setCallSave] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [version, setVersion] = useState('1.0');
  const [dataToSave, setDataToSave] = useState({ hideName: '' } || {});
  const [date, setDate] = useState(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  });
  const [isHistory, setIsHistory] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);

  const dataCustomerById = useSelector((state) => state.financialSolution.customerSelect);
  const { historyList, preparedIllustration, history } = useSelector((state) => state.financialSolution);
  console.log(history);
  useLayoutEffect(() => {
    dispatch(updateSelectCustomer({ total: total, typeFund: typeFund, userSelected: userSelected, values: values }));
    dispatch(getCustomerByIdAndType({ id: userSelected.customerId, typeId: userSelected.typeId }));
    dispatch(getIllustrationHistoryS(userSelected.customerId));
  }, []);
  // console.log(dataToSave);
  useEffect(() => {
    if (!isHistory) {
      let params = {
        fundType: typeFund,
        customerId: userSelected.customerId,
        result: 'string',
        // "baseYears": dataToSave.investmentYear,
        baseYears: dataToSave.investmentYear,
        version: version,
        interestRate: 'string',
        expensePerMonth: 'string',
      };
      dispatch(getPreparedIllustrations(params));
    }
  }, [location?.state, dataToSave?.investmentYear]);
  //

  useEffect(() => {
    //call api history
    // dispatch(getFinanceSolution(id))
    setDataToSave({ ...dataToSave, ...dataCustomerById, apptId: userSelected.apptId });
  }, [dataCustomerById]);

  // useEffect(() => {
  //   history ?
  //     setDataToSave(prev => {
  //       prev.additionalInvestmentYear = history.topUpYears
  //       prev.annualBasePremiums = history.annualBasePremiums
  //       prev.annualTopUpPremiums = history.annualTopUpPremiums
  //       prev.investmentYear = history.baseYears
  //       prev.percentage = history.rate
  //       prev.total = history.sumInsured.faceAmount
  //       return ({
  //         ...prev
  //       })
  //     })
  //     // setVersion(history.version)
  //     : null
  // }, [history])

  useEffect(() => {
    if (callSave) {
      let data = {
        apptId: dataToSave.apptId,
        customerId: dataToSave.userSelected.customerId,
        fundType: dataToSave.typeFund,
        isPotential: dataToSave.values.isPotential == undefined ? 'false' : 'true',
        result: 'string',
        hintName: dataToSave.hideName,
        version: version,
        sumInsured: Number(dataToSave.total),
        baseYears: Number(dataToSave.investmentYear),
        basePremium: 20000000,
        annualBasePremiums: dataToSave.annualBasePremiums,
        CISupport: 100000000,
        inpatient: 'silver',
        outpatient: 'titan',
        premiumSupport: 0,
        topUpPremium: 20000000,
        topUpYears: dataToSave.additionalInvestmentYear,
        annualTopUpPremiums: dataToSave.annualTopUpPremiums,
        rate: Number(dataToSave.percentage),
        healthInsuranceRate: 2.8,
        healthInsured: 10600000,
        healthInsuredArray: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        interestRate: dataToSave.investmentYear.toString(),
        expensePerMonth: 'string',
      };
      dispatch(postSaveFinances(data));
      setCallSave(false);
    }
  }, [callSave]);

  useEffect(() => {
    dispatch(getIllustrationHistoryS(userSelected.customerId));
  }, [isHistoryModalOpen]);

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  };

  // console.log(dataToSave);
  useEffect(() => {}, [dataToSave]);

  const sendEmail = () => {
    // window.location.href =
    //   "https://mail.google.com/mail/u/0/#inbox?compose=new";
  };
  const handleContractBtn = () => {
    navigate('/advise/contract-management');
  };
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
              Khách hàng: <span>{location?.state?.userSelected?.name}</span>
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
                content={<HistoryModal historyList={historyList} setIsHistory={(e) => setIsHistory(e)} />}
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
              <ClosingModal
                setCallSave={(e) => setCallSave(e)}
                setDataToSave={(e) => {
                  setDataToSave(e);
                }}
              />
            </div>
          </div>
        </div>
        {preparedIllustration && dataToSave?.age && (
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={tabExtra()}
            items={[
              {
                label: 'Minh họa giá trị ủy thác',
                key: '1',
                children: (
                  <FiduciaryValue
                    data={dataToSave}
                    setDataToSave={(e) => setDataToSave(e)}
                    preparedIllustration={preparedIllustration}
                    callSave={callSave}
                    isHistory={isHistory}
                    dataHistory={history}
                    setIsHistory={(e) => setIsHistory(e)}
                  />
                ),
              },
              {
                label: 'Tóm tắt quyền lợi bằng bông hoa',
                key: '2',
                children: <SummaryOfBenefits data={dataToSave} />,
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default IllustrateFiduciary;
