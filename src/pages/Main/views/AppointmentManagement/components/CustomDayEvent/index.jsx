import React from 'react';
import moment from 'moment';
import { statusAppointment } from '../../../../../../ultis/statusAppointment';

//COMPONENT
import {
  Company,
  UserCircle,
  Users,
} from '../../../../../../assets/images/icons/components';

// STYLES
import * as S from './styles';

export const DayEvent = ({ event }) => {
  var startDate = new Date(event.start);
  var endDate = new Date(event.end);
  const diffTime = Math.abs(endDate - startDate);
  const start = moment(event.start).format('LT');
  const startSchedular = moment.duration(diffTime, 'milliseconds').asMinutes();

  return (
    <S.WrapContainer
      backgroundColor={statusAppointment(event.status).backgroundColor}
      color={statusAppointment(event.status).color}
    >
      <S.Content>
        {event.company ? (
          <S.BoxTitle>
            <Company
              width={15}
              height={13}
              color={statusAppointment(event.status).color}
            />
            <S.Name>DN - {event.company.members}</S.Name>
            <Users color={statusAppointment(event.status).color} />
          </S.BoxTitle>
        ) : (
          <S.BoxTitle>
            <UserCircle color={statusAppointment(event.status).color} />
            <S.Name>Cá nhân</S.Name>
          </S.BoxTitle>
        )}
        <S.Text color={statusAppointment(event.status).color}>
          {event.title}
        </S.Text>
        <S.Description check={event.status === 'wait'}>
          {event.description}
        </S.Description>
      </S.Content>

      <S.Text
        color={statusAppointment(event.status).color}
      >{`${start} (${startSchedular}p)`}</S.Text>
    </S.WrapContainer>
  );
};

export default DayEvent;
