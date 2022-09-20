export const statusAppointment = (value) => {
  switch (value) {
    case 'cancel':
      return {
        color: '#FF5855',
        backgroundColor: '#FFFAFA',
      };
    case 'wait':
      return {
        color: '#FFFAFA',
        backgroundColor: '#EDBF21',
      };
    case 'waiting':
      return {
        color: '#F6CF47',
        backgroundColor: '#FFF8DE',
      };
    default:
      return {
        color: '#3DBD77',
        backgroundColor: '#EFF9F8',
      };
  }
};
