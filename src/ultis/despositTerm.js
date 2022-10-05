import { DEPOSIT_TERM } from './constant';

export const getDepositTermLabel = (depositTermValue) => {
  const info = _.find(DEPOSIT_TERM, function (value) {
    return value.value === depositTermValue;
  });

  return info.label;
};
