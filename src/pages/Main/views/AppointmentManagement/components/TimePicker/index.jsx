import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Form } from 'antd';

// IMAGE
import { Clock, ArrowDown } from '../../../../../../assets/images/icons/components';

//STYLES
import * as S from './styles';

export const TimePicker = ({ start, end }) => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startTime, setStartTime] = useState(start && start);
  const [endTime, setEndTime] = useState(end && end);
  const diffTime = new Date(endTime) - new Date(startTime);
  const minutes = moment.duration(diffTime, 'milliseconds').asMinutes().toFixed();

  const handleOnChangeStart = (time) => {
    setStartTime(time);
    setShowEnd(true);
    setShowStart(false);
  };

  const handleOnChangeEnd = (time) => {
    setEndTime(time);
    setShowEnd(false);
  };

  const disabledHoursStart = () => {
    const now = new Date();
    const hours = [];
    const currentHour = moment(now).hour();
    for (let i = 0; i <= 24; i++) {
      i < currentHour && hours.push(i);
    }
    return hours;
  };

  const disabledMinutesStart = (selectedHour) => {
    const now = new Date();
    const minutes = [];
    if (selectedHour === moment(now).hour()) {
      for (let i = 0; i < moment(now).minute(); i += 1) minutes.push(i);
    }
    return minutes;
  };

  const disabledHoursEnd = () => {
    const hours = [];
    const currentHour = moment(startTime).hour();
    for (let i = 0; i <= 24; i++) {
      i < currentHour && hours.push(i);
    }

    return hours;
  };

  const disabledMinutesEnd = (selectedHour) => {
    const minutes = [];
    if (selectedHour === moment(startTime).hour()) {
      for (let i = 0; i < moment(startTime).minute(); i += 1) minutes.push(i);
    }
    return minutes;
  };

  return (
    <S.WrapContainer>
      <S.BoxTimePicker>
        <S.BoxClock>
          <Clock color="#999" />
        </S.BoxClock>
        <Form.Item
          name="startTime"
          // rules={[{ required: true, message: 'Missing ' }]}
        >
          <S.TimePicker
            name="start"
            open={showStart}
            placeholder=""
            format={'HH:mm'}
            hideDisabledOptions={false}
            bordered={false}
            allowClear={false}
            suffixIcon={null}
            showNow={false}
            onChange={handleOnChangeStart}
            disabledHours={disabledHoursStart}
            disabledMinutes={disabledMinutesStart}
          />
        </Form.Item>
        <S.Space>-</S.Space>
        <Form.Item
          name="endTime"
          // rules={[{ required: true, message: 'Missing ' }]}
        >
          <S.TimePicker
            open={showEnd}
            placeholder=""
            format={'HH:mm'}
            hideDisabledOptions={false}
            bordered={false}
            allowClear={false}
            suffixIcon={null}
            showNow={false}
            onChange={handleOnChangeEnd}
            disabledHours={disabledHoursEnd}
            disabledMinutes={disabledMinutesEnd}
          />
        </Form.Item>

        <S.DropDownBtn type="text" icon={<ArrowDown />} onClick={() => setShowStart(!showStart)} />
      </S.BoxTimePicker>

      <S.WrapMinutes>
        <S.WrapMinutesLeft>
          <S.BoxClock>
            <Clock color="#999" />
          </S.BoxClock>
          <span>{startTime && endTime && !isNaN(minutes) && parseInt(minutes) > 0 ? minutes : ''}</span>
        </S.WrapMinutesLeft>
        <S.WrapMinutesRight>Phút</S.WrapMinutesRight>
      </S.WrapMinutes>
    </S.WrapContainer>
  );
};

export default TimePicker;
