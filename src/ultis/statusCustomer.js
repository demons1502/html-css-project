import { CustomerStatus } from '../constants/customerStatus';

export const getCustomerStatus = (value) => {
  switch (value) {
    case CustomerStatus.STOP_CONSULTING.key:
      return CustomerStatus.STOP_CONSULTING.text;
    case CustomerStatus.NOT_CALL_YET.key:
      return CustomerStatus.NOT_CALL_YET.text;
    case CustomerStatus.CALL_1_CALL_2.key:
      return CustomerStatus.CALL_1_CALL_2.text;
    case CustomerStatus.CALL_N_CALL_N_1.key:
      return CustomerStatus.CALL_N_CALL_N_1.text;
    case CustomerStatus.APPOINTMENT_SURVEY.key:
      return CustomerStatus.APPOINTMENT_SURVEY.text;
    case CustomerStatus.SURVEYED_FINANCE_CONSULT.key:
      return CustomerStatus.SURVEYED_FINANCE_CONSULT.text;
    case CustomerStatus.APPOINTMENT_CONSULT.key:
      return CustomerStatus.APPOINTMENT_CONSULT.text;
    case CustomerStatus.CONSULTED_SOLUTION.key:
      return CustomerStatus.CONSULTED_SOLUTION.text;
    case CustomerStatus.SOLUTION_RESULT.key:
      return CustomerStatus.SOLUTION_RESULT.text;
    case CustomerStatus.RESULT_CONTRACT.key:
      return CustomerStatus.RESULT_CONTRACT.text;
    case CustomerStatus.CONTRACTED.key:
      return CustomerStatus.CONTRACTED.text;
    case CustomerStatus.CUSTOMER_CARE.key:
      return CustomerStatus.CUSTOMER_CARE.text;
  }
};
