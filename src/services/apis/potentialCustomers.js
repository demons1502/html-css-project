import request from '../request';

export const getPotentialCustomersApi = async (data) =>
  request({
    url: '/customers',
    method: 'get',
    data,
  });

export const createPotentialCustomersApi = async (data) =>
  request({
    url: '/customer',
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Tạo khách hàng thành công!',
    messageError: 'Tạo khách hàng thất bại',
  });

export const deletePotentialCustomerApi = async (data) =>
  request({
    url: '/customers',
    method: 'delete',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Xoá khách hàng thành công!',
    messageError: 'Xoá khách hàng thất bại',
  });

export const getCompaniesApi = async () =>
  request({
    url: '/companies',
    method: 'get',
  });

export const getPotentialCustomerApi = async (data) =>
  request({
    url: `customers/${data.customerId}/${data.typeId}`,
    method: 'get',
    data,
  });

export const updatePotentialCustomerApi = async (data) =>
  request({
    url: `customers/${data.customerId}`,
    method: 'patch',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Cập nhật khách hàng thành công!',
    messageError: 'Cập nhật khách hàng thất bại',
  });

export const importCustomersApi = async (data) =>
  request({
    url: `bulk-create-upload`,
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Import khách hàng thành công!',
    messageError: 'Import khách hàng thất bại',
  });

export const createCustomerCallsApi = async (data) =>
  request({
    url: 'customer-calls/bulk-create',
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Tạo cuộc gọi với khách hàng thành công!',
    messageError: 'Tạo cuộc gọi với khách hàng thất bại!',
  });
