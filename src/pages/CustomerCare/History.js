import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Checkbox, message } from 'antd';
import { getData, setCustomerData } from '../../slices/customerCare';
import Table from '../../components/common/TableNormal';
import IconPlus from '../../assets/images/icons/plus.svg';
import IconFiles from '../../assets/images/icons/files.svg';
import Filter from '../../components/common/Filter';
import AddInfoContent from './/Modal/AddInfoContent';
import Modal from '../../components/common/Modal';
import { CUSTOMER_CARE_INFO, LOADING_STATUS, ARR_INFO_REDIRECT, INFO_PATH, GIFT } from '../../ultis/constant';
import { calculateAge, getCustomerCareLabel, formatDate, capitalizeFirstLetter } from '../../helper';
import { Link, useNavigate } from 'react-router-dom';
import useScrollTableConfig from '../../hooks/useScrollTableConfig';
import * as S from '../../components/styles';
import { updateCustomer } from '../../services/customers';

export default function History() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const loading = useSelector((state) => state.loading.loading);
  const { data, customerData } = useSelector((state) => state.customerCare);
  const scrollConfig = useScrollTableConfig(ref, data);
  const [visibleModalAddInfo, setVisibleModalAddInfo] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [optionsFilter, setOptionsFilter] = useState(_.map(CUSTOMER_CARE_INFO, 'value'));
  const [lastGift, setLastGift] = useState('');
  const [list, setList] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(customerData);
  const columns = [
    {
      title: t('common.date'),
      key: 'date',
      width: '20%',
      render: (record) => {
        return <span>{formatDate(record.date)}</span>;
      },
    },
    {
      title: t('common.type info'),
      key: 'info',
      width: '25%',
      render: (record) => {
        return <span>{getCustomerCareLabel(record.info)}</span>;
      },
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '',
      key: 'info',
      width: '18%',
      render: (record) => {
        if (ARR_INFO_REDIRECT.includes(record.info)) {
          const t = record.info.toLowerCase();
          const consult = `?consult_id=${record.consult?.id}`;
          const survey = `?survey_id=${record.survey?.surveyId}&customer_id=${record.survey?.customerId}&appointment_id=${record.survey?.apptId}`;
          const solution = `?solution_id=${record.solution?.id}`;
          const handleOnclickView = () => {
            if (t === 'advise') {
              return navigate(`${INFO_PATH[record.info]}${consult}`);
            }
            if (t === 'solution') {
              return navigate(`${INFO_PATH[record.info]}${solution}`);
            }
            return navigate(`${INFO_PATH[record.info]}${survey}`);
          };
          return (
            <div className="d-flex-end">
              {/* <Link to={INFO_PATH[record.info]} className="btn-bgWhite-textGreen-borGreen pd-btn">
                <span>Xem</span>
              </Link> */}
              <S.Button size="small" onClick={handleOnclickView}>
                Xem
              </S.Button>
            </div>
          );
        }
      },
    },
  ];

  const addModal = (detail) => {
    setVisibleModalAddInfo(true);
    setDetailData({});
  };

  //sort
  useEffect(() => {
    const dataList = [...data];
    const dataSort = dataList.sort((a, b) => {
      const aInfo = a.info.toLowerCase();
      const bInfo = b.info.toLowerCase();
      return (bInfo === 'gift') - (aInfo === 'gift');
    });
    data && setList(dataSort);
  }, [data]);

  useEffect(() => {
    if (customerData.customerId > 0) {
      dispatch(getData({ customerId: customerData.customerId, info: optionsFilter }));
    }
  }, [optionsFilter]);

  useEffect(() => {
    if (loading === LOADING_STATUS.succeeded) {
      setVisibleModalAddInfo(false);
    }
  }, [loading]);

  useEffect(() => {
    setLastGift('');
    if (data.length > 0) {
      let arrayGift = _.filter(data, (element) => {
        if (element.info === GIFT) {
          return { content: element.content, date: element.date };
        }
      });
      if (arrayGift.length > 0) {
        setLastGift(
          `Quà tặng lần cuối ${capitalizeFirstLetter(_.first(arrayGift).content)} vào ngày ${formatDate(
            _.first(arrayGift).date
          )}`
        );
      }
    }
  }, [data]);

  const setPotentialCustomer = async () => {
    if (customerData.isPotential) {
      await updateCustomer(customerData.customerId, { ...customerData, ...{ isPotential: false } });
      dispatch(setCustomerData({ ...customerData, ...{ isPotential: false } }));
      message.success('Thay đổi thông tin thành công');
    } else {
      await updateCustomer(customerData.customerId, { ...customerData, ...{ isPotential: true } });
      dispatch(setCustomerData({ ...customerData, ...{ isPotential: true } }));
      message.success('Thay đổi thông tin thành công');
    }
  };

  return (
    <>
      <div>
        <div className="customer-care__right--management">
          <div className="customer-care__right--top">
            <Checkbox className="checkbox-item" checked={!customerData.isPotential} onChange={setPotentialCustomer}>
              {t('customer care.no more potential')}
            </Checkbox>
          </div>
          <div className="customer-care__right--event">
            <div className="customer-care__right--event--left">
              <h5>{t('customer care.history title')}</h5>
              <Filter options={CUSTOMER_CARE_INFO} optionsFilter={optionsFilter} setPayload={setOptionsFilter} />
            </div>
          </div>
          <div className="customer-care__right--list" ref={ref}>
            <Table dataSource={list} columnTable={columns} /* scroll={scrollConfig} */ />
          </div>
          {customerData.customerId !== 0 && (
            <div className="customer-care__right--footer">
              <S.ButtonAdd icon={<img src={IconPlus} alt="" />} onClick={() => addModal()}>
                {t('customer care.add info title')}
              </S.ButtonAdd>
            </div>
          )}
        </div>
        {customerData.customerId !== 0 && (
          <div className="customer-care__right--info">
            <h3>
              <img src={IconFiles} alt="" />
              {t('customer care.sync info')}
            </h3>
            <ul>
              <li>
                {calculateAge(customerData.dob)} tuổi,{' '}
                {customerData.maritalStatus == 1 ? ' đã có gia đình' : ' độc thân'}
              </li>
              {customerData.income > 0 && <li>Thu nhập {customerData.income / 1000000} triệu đồng/tháng</li>}
              {!!customerData.job && (
                <li>
                  Nghề nghiệp <span className="capitalize">{customerData.job}</span>
                </li>
              )}
              {!!customerData.concerns && (
                <li>
                  Sở thích <span className="capitalize">{customerData.concerns}</span>
                </li>
              )}
              {!!lastGift && <li>{lastGift}</li>}
              {!!customerData.note && (
                <li>
                  Khác: <span className="capitalize">{customerData.note}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <Modal
        isVisible={visibleModalAddInfo}
        setIsVisible={setVisibleModalAddInfo}
        title={
          Object.keys(detailData).length > 0 ? t('customer care.edit info title') : t('customer care.add info title')
        }
        width={770}
        content={<AddInfoContent detailData={detailData} setVisibleModalAddInfo={setVisibleModalAddInfo} />}
      />
    </>
  );
}
