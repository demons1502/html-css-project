import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Form } from 'antd';

// IMAGE
import { Clock, ArrowDown } from '../../../../../../assets/images/icons/components';

//STYLES
import * as S from './styles';

export const TimePicker = ({ start, end, form }) => {
  const [formValue, setFormValue] = useState(form);
  const fields = formValue.getFieldsValue();

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startTime, setStartTime] = useState(start && start);
  const [endTime, setEndTime] = useState(end && end);
  const diffTime = new Date(endTime) - new Date(startTime);
  const minutes = moment.duration(diffTime, 'milliseconds').asMinutes().toFixed();
  const hoursDisables = [0, 1, 2, 3, 4, 5, 6, 23];
  const now = new Date();
  const formDate = new Date(fields.date);

  useEffect(() => {
    setFormValue(form);
  }, [form]);

  const handleOnChangeStart = (time) => {
    const selectTime = new Date(time);
    if (formDate.getDate() === now.getDate()) {
      if (now.getTime() > selectTime.getTime()) {
        setStartTime(moment(now));
        form.setFieldsValue({ startTime: moment(now) });
      }
    }
    setStartTime(time);
    form.setFieldsValue({ startTime: time, endTime: undefined });
    setShowStart(false);
  };

  const handleOnChangeEnd = (time) => {
    const end = new Date(time);
    const start = new Date(startTime);
    if (start.getTime() < end.getTime()) {
      form.setFieldsValue({ endTime: moment(time) });
      setEndTime(time);
      setShowEnd(false);
    }
  };

  const disabledHoursStart = () => {
    const hours = [];
    if (formDate.getDate() === now.getDate()) {
      const currentHour = moment(now).hour();
      for (let i = 0; i <= 24; i++) {
        i < currentHour && hours.push(i);
      }
    }

    return [...hours, ...hoursDisables];
  };

  const disabledMinutesStart = (selectedHour) => {
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
    return [...hours, ...hoursDisables];
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
            placeholder="HH:mm"
            format={'HH:mm'}
            hideDisabledOptions={true}
            bordered={false}
            allowClear={false}
            suffixIcon={null}
            showNow={false}
            minuteStep={5}
            onClick={() => setShowStart(!showStart)}
            onChange={handleOnChangeStart}
            disabledHours={disabledHoursStart}
            disabledMinutes={disabledMinutesStart}
            onBlur={() => setShowStart(false)}
          />
        </Form.Item>
        <S.Space>-</S.Space>
        <Form.Item
          name="endTime"
          // rules={[{ required: true, message: 'Missing ' }]}
        >
          <S.TimePicker
            open={showEnd}
            placeholder="HH:mm"
            format={'HH:mm'}
            hideDisabledOptions={true}
            bordered={false}
            allowClear={false}
            suffixIcon={null}
            showNow={false}
            minuteStep={5}
            onClick={() => setShowEnd(!showEnd)}
            onChange={handleOnChangeEnd}
            disabledHours={disabledHoursEnd}
            disabledMinutes={disabledMinutesEnd}
            onBlur={() => setShowEnd(false)}
          />
        </Form.Item>

        <S.DropDownBtn icon={<ArrowDown />} />
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
