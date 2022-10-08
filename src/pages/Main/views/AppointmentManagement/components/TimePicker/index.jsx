import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Form } from 'antd';

// IMAGE
import { Clock, ArrowDown } from '../../../../../../assets/images/icons/components';

//STYLES
import * as S from './styles';

export const TimePicker = ({ form }) => {
  const [formValue, setFormValue] = useState(form);
  const fields = formValue.getFieldsValue();

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const hoursDisables = [0, 1, 2, 3, 4, 5, 6, 23];
  const now = new Date();
  const formDate = new Date(fields.date);

  useEffect(() => {
    const formValues = form.getFieldsValue();
    setStartTime(formValues.startTime)
    setEndTime(formValues.endTime)
  }, [form]);

  const handleOnChangeStart = (time) => {
    const selectTime = new Date(time);
    if (formDate.getDate() === now.getDate()) {
      if (now.getTime() > selectTime.getTime()) {
        setStartTime(time.add(5, 'minutes'));
        formValue.setFieldsValue({ startTime: time.add(5, 'minutes'), endTime: undefined });
      }
    }
    setStartTime(time);
    formValue.setFieldsValue({ startTime: time, endTime: undefined });
    setShowStart(false);
  };

  const handleOnChangeEnd = (time) => {
    form.setFieldsValue({ endTime: moment(time) });
    setEndTime(time);
    setShowEnd(false);
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
      for (let i = 0; i <= moment(now).minute(); i += 1) minutes.push(i);
    }
    return minutes;
  };

  const disabledHoursEnd = () => {
    const hours = [];
    if (startTime) {
      const currentHour = startTime.hour();
      for (let i = 0; i <= 24; i++) {
        i < currentHour && hours.push(i);
      }
    }
    return [...hours, ...hoursDisables];
  };

  const disabledMinutesEnd = (selectedHour) => {
    const minutes = [];
    if (startTime) {
      if (selectedHour === startTime.hour()) {
        for (let i = 0; i <= startTime.minute(); i += 1) minutes.push(i);
      }
    }
    return minutes;
  };

  const totalMinutes = () => {
    const start = startTime.hour() * 60 + startTime.minute();
    const end = endTime.hour() * 60 + endTime.minute();

    return end - start;
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
            value={ startTime }
            open={ showStart }
            placeholder="hh:mm"
            format={ 'HH:mm' }
            hideDisabledOptions={ true }
            bordered={ false }
            allowClear={ false }
            suffixIcon={ null }
            showNow={ false }
            minuteStep={ 5 }
            onClick={ () => setShowStart(!showStart) }
            onChange={ handleOnChangeStart }
            disabledHours={ disabledHoursStart }
            disabledMinutes={ disabledMinutesStart }
            onBlur={ () => setShowStart(false) }
          />
        </Form.Item>
        <S.Space>-</S.Space>
        <Form.Item
          name="endTime"
        // rules={[{ required: true, message: 'Missing ' }]}
        >
          <S.TimePicker
            open={ showEnd }
            placeholder="hh:mm"
            format={ 'HH:mm' }
            hideDisabledOptions={ true }
            bordered={ false }
            allowClear={ false }
            suffixIcon={ null }
            showNow={ false }
            minuteStep={ 5 }
            onClick={ () => setShowEnd(!showEnd) }
            onChange={ handleOnChangeEnd }
            disabledHours={ disabledHoursEnd }
            disabledMinutes={ disabledMinutesEnd }
            onBlur={ () => setShowEnd(false) }
          />
        </Form.Item>

        <S.DropDownBtn><ArrowDown /></S.DropDownBtn>
      </S.BoxTimePicker>

      <S.WrapMinutes>
        <S.WrapMinutesLeft>
          <S.BoxClock>
            <Clock color="#999" />
          </S.BoxClock>
          <span>{ fields.startTime && startTime && endTime && parseInt(totalMinutes()) > 0 ? totalMinutes() : '' }</span>
        </S.WrapMinutesLeft>
        <S.WrapMinutesRight>Phút</S.WrapMinutesRight>
      </S.WrapMinutes>
    </S.WrapContainer>
  );
};

export default TimePicker;
