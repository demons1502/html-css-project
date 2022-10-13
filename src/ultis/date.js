import moment from 'moment';

export const getMonday = (date) => {
  const first = date.getDate() - date.getDay() - 6;
  return moment(new Date(d.setDate(first)));
};

export const formaTimeUtc = (date) => {
  return new Date(moment(date).utc().format('YYYY-MM-DDTHH:mm:ss'));
};

export const convertDay = (day) => {
  switch (day) {
    case 0:
      return 'Chủ nhật';
    case 1:
      return 'Thứ 2';
    case 2:
      return 'Thứ 3';
    case 3:
      return 'Thứ 4';
    case 4:
      return 'Thứ 5';
    case 5:
      return 'Thứ 6';
    case 6:
      return 'Thứ 7';
  }
};
