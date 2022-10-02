import { TITLE_APPOINTMENT } from '../constants/appointment';

export const getTitleAppointment = (value) => {
  switch (value) {
    case 'survey':
      return TITLE_APPOINTMENT.SURRVEY;

    case 'finance':
      return TITLE_APPOINTMENT.FINANCE;

    case 'consult':
      return TITLE_APPOINTMENT.CONSULT;

    case 'contract':
      return TITLE_APPOINTMENT.CONTRACT;

    default:
      return value;
  }
};
