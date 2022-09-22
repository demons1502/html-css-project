import moment from 'moment'
import {FORMAT_DATE, CUSTOMER_CARE_INFO} from '../ultis/constant'
import _ from 'lodash'

export const formatDataNumber = (number) => {
  if (number) {
    return new Intl.NumberFormat().format(number)
  } else return 0
}

export const pad = (num, size) => {
  num = num.toString()
  while (num.length < size) num = "0" + num
  return num
}

export const getTimeByTZ = (date, format = FORMAT_DATE) => {
  return moment().local().format(format)
}

export const getCustomerCareLabel = (customerValue) => {
  const info =  _.find(CUSTOMER_CARE_INFO, function (value) {
    return value.value === customerValue;
  })

  return info.label
}

export const calculateAge = (dob) => {
  let birthYear = moment(dob).utc().format("YYYY")
  let year = moment().format("YYYY")

  return year - birthYear;
}
