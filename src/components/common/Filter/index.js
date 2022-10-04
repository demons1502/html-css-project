import React, { Button, Checkbox, Row, Col, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import FilterIcon from '../../../assets/images/icons/filter.svg';
import * as S from './styles';
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function Filter(props) {
  const { t } = useTranslation();
  const { options, setPayload, defaultChecked } = props;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const checkFilter = (checkedValues) => {
    setPayload(checkedValues);
    setCount(checkedValues.length);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleCheck = useCallback(() => {
    const listChecked = [];
    for (let i = 0; i < options.length; i++) {
      listChecked.push(options[i].value);
    }
    return listChecked;
  }, [defaultChecked]);

  useEffect(() => {
    defaultChecked && setCount(handleCheck().length);
    defaultChecked && setPayload(handleCheck());
  }, [defaultChecked]);

  const checkboxRender = useMemo(() => {
    return (
      <Checkbox.Group
        style={{ maxWidth: '400px' }}
        onChange={checkFilter}
        className="checkbox-item"
        defaultValue={defaultChecked ? handleCheck() : null}
      >
        <Row>
          {options.map((val, index) => {
            return (
              <Col key={index} span={24}>
                <Checkbox value={val?.value}>{val?.label}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    );
  });

  return (
    <div className="filter">
      <Popover content={checkboxRender} trigger="click" placement="bottomLeft" onOpenChange={handleOpenChange}>
        <S.ButtonFilter active={open ? 1 : 0}>
          <S.Div>
            <S.Span>{count}</S.Span>
            {t('common.filter')}
          </S.Div>
          <img src={FilterIcon} alt="" />
        </S.ButtonFilter>
      </Popover>
    </div>
  );
}
