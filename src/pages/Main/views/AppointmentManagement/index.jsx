import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from '../../../../hooks/useRouter';
import moment from 'moment';
import { getAppointments } from '../../../../slices/appointmentManagement';
import { getCustomerByIdAndType } from '../../../../services/customers';

// STYLES
import * as S from './styles';

// COMPONENTS
import { Row, Col } from 'antd';
import CalendarCustom from './components/CustomCalendar';
import InformationAppointment from './components/InformationAppointment';
import CreateAppointment from './components/CreateAppointment';

const Appointment = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const appointmentReducer = useSelector((state) => state.appointment);

  const { data } = appointmentReducer;
  const nowDate = new Date();
  const [event, setEvent] = useState();
  const [openAppointment, setOpenAppointment] = useState(false);
  const [customer, setCustomer] = useState({});
  const startDate = moment().clone().weekday(0).format('YYYY-MM-DD 00:00:00');
  const endDate = moment().clone().weekday(6).format('YYYY-MM-DD 23:59:59');

  useEffect(() => {
    dispatch(
      getAppointments({
        startDate: startDate,
        endDate: endDate,
      })
    );
  }, []);

  useEffect(() => {
    if (!event) {
      setEvent(checkAppointment);
    } else {
      const dataEvent = data.find((i) => i.apptId === event.apptId);
      dataEvent ? setEvent(dataEvent) : setEvent(checkAppointment);
    }
  }, [data]);

  useEffect(() => {
    const { customerId, typeId } = query;
    async function getCustomer() {
      const { data } = await getCustomerByIdAndType(customerId, typeId);
      if (data) {
        setCustomer(data);
        setOpenAppointment(true);
      }
    }

    customerId && typeId && getCustomer();
  }, [query]);

  const sort = (array) => {
    if (array) {
      return array.sort(function (a, b) {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
    }
  };

  const checkAppointment = useCallback(() => {
    const appointmentCurrent = sort(
      data.filter((i) => {
        if (new Date(i.start).getDate() === nowDate.getDate() && new Date(i.end).getTime() > nowDate.getTime()) {
          return i;
        } else if (
          new Date(i.start).getDate() === nowDate.getDate() &&
          new Date(i.end).getTime() <= nowDate.getTime()
        ) {
          return i;
        }
      })
    );

    const appointmentFuture = sort(data.filter((i) => new Date(i.start).getDate() > nowDate.getDate()));

    const appointmentCurrentPast = sort(data.filter((i) => new Date(i.end).getDate() < nowDate.getDate()));

    if (appointmentCurrent.length > 0) {
      return appointmentCurrent[0];
    } else if (appointmentFuture.length > 0) {
      return appointmentFuture[0];
    } else {
      return appointmentCurrentPast[appointmentCurrentPast?.length - 1];
    }
  }, [data]);

  const handleEvent = (value) => {
    setEvent(value);
  };

  return (
    <S.WrapContainer>
      <S.WrapTitle>Quản lý lịch hẹn</S.WrapTitle>
      <Row gutter={[8, 16]}>
        <Col lg={14} md={24} sm={24}>
          <CalendarCustom eventActive={event} handleEvent={handleEvent} />
        </Col>
        <Col lg={10} md={24} sm={24}>
          <InformationAppointment info={event} />
        </Col>
      </Row>
      <CreateAppointment
        open={openAppointment}
        handleCancel={() => {
          setOpenAppointment(false);
        }}
        customerInfo={customer}
        outsideLink={true}
      />
    </S.WrapContainer>
  );
};

export default Appointment;
