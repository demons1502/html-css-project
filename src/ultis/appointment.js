import { TITLE_APPOINTMENT } from '../constans/appointment';

export const getTitleAppointment = (value) => {
  switch (value) {
    case 'survey':
      return TITLE_APPOINTMENT.SURRVEY;

    case 'finance':
      return TITLE_APPOINTMENT.FINANCE;

    case 'consult':
      return TITLE_APPOINTMENT.CONSULT;
    default:
      return value;
  }
};
