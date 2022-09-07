import React from 'react';

export default function ListNormalItem(props) {
  const { data, selectId = null, setSelectId = null } = props;

  const selectItem = () => {
    if (!!setSelectId) {
      setSelectId(data?.key)
    }
  }

  return (
    <div className={`normal-item ${selectId === data.key ? 'normal-item-active' : ''}`} onClick={selectItem}>
      <p className="normal-item--name">{data?.name}</p>
    </div>
  );
}
