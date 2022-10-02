export const CustomerStatus = {
  STOP_CONSULTING: { text: 'Không còn tiềm năng', key: 'STOP_CONSULTING' }, // stop consulting
  NOT_CALL_YET: { text: 'Chưa gọi điện', key: 'NOT_CALL_YET' }, // Not called yet
  CALL_1_CALL_2: { text: 'Đã gọi điện lần 1', key: 'CALL_1_CALL_2' }, // Called n times, need to call n+1 times
  CALL_N_CALL_N_1: { text: 'Đã gọi điện lần n', key: 'CALL_N_CALL_N_1' }, // Called n times, need to call n+1 times
  APPOINTMENT_SURVEY: {
    text: 'Đã có lịch hẹn gặp khảo sát',
    key: 'APPOINTMENT_SURVEY',
  }, // Appointment scheduled for a survey
  SURVEYED_FINANCE_CONSULT: {
    text: 'Đã khảo sát',
    key: 'SURVEYED_FINANCE_CONSULT',
  }, // Surveyed, waiting for financial consultation
  APPOINTMENT_CONSULT: {
    text: 'Đã có lịch tư vấn tài chính',
    key: 'APPOINTMENT_CONSULT',
  }, // Appointment scheduled for a consultation
  CONSULTED_SOLUTION: {
    text: 'Đã tư vấn tài chính',
    key: 'CONSULTED_SOLUTION',
  }, // Consulted, waiting for an appointment to consult a solution
  SOLUTION_RESULT: {
    text: 'Đã tư vấn giải pháp',
    key: ' SOLUTION_RESULT',
  }, // The solution has been consulted, waiting for the final result
  RESULT_CONTRACT: {
    text: 'Đã chốt kết quả',
    key: ' RESULT_CONTRACT',
  }, // The results have been closed, waiting for contract information
  CONTRACTED: {
    text: 'Đã có hợp đồng',
    key: ' RESULT_CONTRACT',
  }, // Already have a contract
  CUSTOMER_CARE: {
    text: 'Chăm sóc khách hàng cho hợp đồng tiếp theo',
    key: 'CUSTOMER_CARE',
  }, //Customer care for the next contract
};
