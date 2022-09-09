import React from 'react';
import {useTranslation} from "react-i18next";

export default function ListCustomerItem(props) {
  const {t} = useTranslation();
  const { data, selectId = null, setSelectId = null } = props;

  const selectItem = () => {
    if (!!setSelectId) {
      setSelectId(data?.key)
    }
  }

  return (
    <div className={`list-customer ${selectId === data.key ? 'list-customer-active' : ''}`} onClick={selectItem}>
      <div className="list-customer__content">
        <p className="list-customer__content-name">
          <span className="dot"></span>
          {data?.name}
        </p>
        <div className="list-customer__content-gender">
          <p className="list-customer__content-gender--left"><span className="before">{t('common.gender')}</span>Nam {data?.gender}</p>
          <p className="list-customer__content-gender--right"><span className="before">{t('common.old')}</span> {data?.age}</p>
        </div>
        <p className={`${selectId === data.key ? 'color-green' : ''} list-customer__content-contract`}>
          <span className="before">{t('common.contract')}</span>{data?.contract}1.000.000.000
        </p>
        <p className="list-customer__content-date">
          <span className="before">{t('common.sign date')}</span>{data?.date}22/07/2022
        </p>
      </div>
    </div>
  );
}
