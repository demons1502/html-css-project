import moment from 'moment'
import {CUSTOMER_CARE_INFO} from '../ultis/constant'
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

export const getTimeByTZ = (date, format = moment.localeData().longDateFormat('L')) => {
  return moment(date).local().format(format)
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

export const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')

export const scrollTableConfig = (ref) => {
  const tabletWith = 992;
  const windowWith = window.innerWidth
  let parentHeight = ref.current.parentElement.parentElement.clientHeight
  const allEl = ref.current.parentNode.childNodes
  let totalHeight = 0
  let siblingHeight = 0
  let scroll = {}
  console.log(allEl)
  allEl.forEach(element => {
    if (ref.current !== element) {
      siblingHeight += element.clientHeight
    }
    console.log(element, element.offsetHeight, element.clientHeight);
    totalHeight += element.clientHeight
  })

  if (windowWith < tabletWith) {
    parentHeight = parentHeight/2
  }

  if (totalHeight > parentHeight) {
    const heightScroll = parentHeight - (siblingHeight + 70);
    scroll = {y: heightScroll, scrollToFirstRowOnChange: false}
  }
  
  return scroll 
}
