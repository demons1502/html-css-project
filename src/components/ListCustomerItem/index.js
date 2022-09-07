import React from 'react';

export default function ListCustomerItem(props) {
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
          <p><span className="before">Giới tính:</span> {data?.gender}</p>
          <p><span className="before">Tuôir:</span> {data?.age}</p>
        </div>
        <p className="list-customer__content-contract">
          <span className="before">Hợp đồng:</span>{data?.contract}
        </p>
        <p className="list-customer__content-date">
          <span className="before">Ngày kí:</span>{data?.date}
        </p>
      </div>
    </div>
  );
}
