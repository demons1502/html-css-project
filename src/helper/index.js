import moment from 'moment';
import { CUSTOMER_CARE_INFO } from '../ultis/constant';
import _ from 'lodash';

export const formatDataNumber = (number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  if (number) {
    return formatter.format(number);
  } 
  return formatter.format('0');
};

export const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
};

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  // format = moment.localeData().longDateFormat('L')
  return date?moment.utc(date).local().format(format) : '';
};
export const formatToUtcDate = (date) => {
  return moment(date).utc().format('YYYY-MM-DD');
};

export const getCustomerCareLabel = (customerValue) => {
  const info = _.find(CUSTOMER_CARE_INFO, function (value) {
    return value.value === customerValue;
  });

  return info.label;
};

export const calculateAge = (dob) => {
  let birthYear = moment(dob).utc().format('YYYY');
  let year = moment().format('YYYY');

  return year - birthYear;
};

export const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('');
