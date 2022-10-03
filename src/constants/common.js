export const marriageStatus = [
  {
    label: 'Chưa lập gia đình',
    value: 1,
  },
  {
    label: 'Đã có gia đình',
    value: 2,
  },
  {
    label: 'Ly dị',
    value: 3,
  },
  {
    label: 'Goá',
    value: 4,
  },
];

export const acquaintanceLevel = [
  {
    label: 'Quen biết',
    value: 1,
  },
  {
    label: 'Thân thiết',
    value: 2,
  },
  {
    label: 'Rất thân',
    value: 3,
  },
];

export const incomeOptions = [
  {
    label: '< 10.000.000',
    value: '10.000.000',
  },
  {
    label: '10.000.000 - 15.000.000',
    value: `{"from": "10.000.000", "to": " 15.000.000"}`,
  },
];

export const typeCustomer = [
  {
    label: 'Cá nhân',
    value: 1,
  },
  {
    label: 'NV doanh nghiệp',
    value: 2,
  },
  {
    label: 'Doanh nghiệp',
    value: 3,
  },
];

export const gender = [
  {
    label: 'Nam',
    value: 1,
  },
  {
    label: 'Nữ',
    value: 2,
  },
  {
    label: 'Khác',
    value: 3,
  },
];

export const relationship = [
  {
    label: 'Nóng',
    value: 1,
  },
  {
    label: 'Ấm',
    value: 2,
  },
  {
    label: 'Lạnh',
    value: 3,
  },
];

export const connectFrom = [
  {
    label: 'Gia đình',
    value: 1,
  },
  {
    label: 'Bạn bè',
    value: 2,
  },
  {
    label: 'Hàng xóm',
    value: 3,
  },
  {
    label: 'Đồng nghiệp',
    value: 4,
  },
  {
    label: 'Bạn làm ăn',
    value: 5,
  },
  {
    label: 'Người thân giới thiệu',
    value: 6,
  },
  {
    label: 'Bạn cộng đồng',
    value: 7,
  },
  {
    label: 'Khách hàng giới thiệu',
    value: 8,
  },
  {
    label: 'Nơi tiêu tiền',
    value: 9,
  },
  {
    label: 'Khác',
    value: 10,
  },
];

export const numerology = [
  'Con số đại diện cho cái tôi, tính cách, năng lực của mỗi con người',
  'Con số của công bằng và cân bằng cảm xúc',
  'Con số Thân thiện và đầy ấm áp',
  'Con số của sự kiên trì và nguyên tắc',
  'Con số của sự kiên trì và nguyên tắc',
  'Người mang lòng trắc ẩn',
  'Người có khả năng nuôi dưỡng tự nhiên',
  'Con số giàu tình cảm và có một tâm hồn yên bình',
  'Bạn ở đây để điều hành, tổ chức, chỉ đạo và dẫn dắt mọi người.',
  'Con số của sự kính trọng và đáng tin cậy',
  'Sống một cuộc đời lãnh đạo, người dẫn đầu đội nhóm',
  'Con số có khả năng tâm linh cao và nhạy cảm.',
  'Con số thể hiện cho thành công và tham vọng hoài bão',
];

export const filterListOption = [
  { label: 'Không còn tiềm năng, dừng tư vấn', value: 'STOP_CONSULTING' },
  { label: 'Chưa gọi điện', value: 'NOT_CALL_YET' },
  { label: 'Đã gọi điện lần 1, cần gọi lần 2', value: 'CALL_1_CALL_2' },
  { label: 'Đã gọi điện lần n, cần gọi lần n+1', value: 'CALL_N_CALL_N_1' },
  { label: 'Đã có lịch hẹn gặp khảo sát', value: 'APPOINTMENT_SURVEY' },
  { label: 'Đã khảo sát, chờ lịch tư vấn tài chính', value: 'SURVEYED_FINANCE_CONSULT' },
  { label: 'Đã có lịch tư vấn tài chính', value: 'APPOINTMENT_CONSULT' },
  { label: 'Đã tư vấn tài chính, chờ lịch hẹn tư vấn  giải pháp', value: 'CONSULTED_SOLUTION' },
  { label: 'Đã tư vấn giải pháp, chờ chốt kết quả', value: 'SOLUTION_RESULT' },
  { label: 'Đã chốt kết quả, chờ thông tin hợp đồng', value: 'RESULT_CONTRACT' },
  { label: 'Đã có hợp đồng', value: 'CONTRACTED' },
  { label: 'Chăm sóc khách hàng cho hợp đồng tiếp theo', value: 'CUSTOMER_CARE' },
];
