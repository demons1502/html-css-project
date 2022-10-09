import React from 'react';
import moment from 'moment';
import { statusAppointment } from '../../../../../../ultis/statusAppointment';
import { getTitleAppointment } from '../../../../../../ultis/appointment';

//COMPONENT
import { Company, UserCircle, Users } from '../../../../../../assets/images/icons/components';

// STYLES
import * as S from './styles';

export const DayEvent = ({ event }, eventActive) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const nowDate = new Date();
  const diffTime = endDate - startDate;
  const start = moment(startDate).format('LT');
  const startSchedular = Math.round(moment.duration(diffTime, 'milliseconds').asMinutes());

  const isEventActive = eventActive ? event.apptId === eventActive?.apptId : false;

  const stausColor = statusAppointment(startDate, endDate, nowDate, event.isCompleted, isEventActive);
  return (
    <S.WrapContainer backgroundColor={ stausColor.backgroundColor } color={ stausColor.color } startSchedular={ startSchedular }>
      <S.Content startSchedular={ startSchedular }>
        {/* COMPANY */ }
        { event.typeId === 3 ? (
          <S.BoxTitle startSchedular={ startSchedular }>
            <Company width={ 15 } height={ 13 } color={ stausColor.color } />
            <S.Name>DN - { event?.customerApptRecords && event?.customerApptRecords.length }</S.Name>
            <Users color={ stausColor.color } />
          </S.BoxTitle>
        ) : (
          <S.BoxTitle startSchedular={ startSchedular }>
            <UserCircle color={ stausColor.color } />
            <S.Name>Cá nhân</S.Name>
          </S.BoxTitle>
        ) }
        { startSchedular > 10 &&
          <S.Text color={ stausColor.color }>{ event.host }</S.Text>
        }

        { startSchedular > 15 &&
          <S.Description check={ isEventActive }>{ getTitleAppointment(event.title) }</S.Description>
        }

      </S.Content>
      { startSchedular > 20 && <S.Text color={ stausColor.color }>{ `${start} (${startSchedular}p)` }</S.Text> }
    </S.WrapContainer>
  );
};

export default DayEvent;
