export const HTTP_200 = 200
export const TYPE_LIST_NORMAL = "NORMAL"
export const TYPE_LIST_CUSTOMERS = "CUSTOMERS"
export const DEFAULT_SIZE = 10
export const PAGE_SIZE_OPTIONS = ['10', '20', '30']
export const FORMAT_DATE = 'DD/MM/YYYY'
export const LOADING_STATUS = {
  idle: "idle",
  pending: "pending",
  succeeded: "succeeded",
  failed: "failed"
}
export const VALIDATE_MESSAGES = {
  required: '${label} không được để trống!',
  types: {
    email: 'Định dang này không phải là email!',
    number: '${label} không phải là số!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
