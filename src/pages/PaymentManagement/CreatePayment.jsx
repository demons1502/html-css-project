import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreatePayment = (props) => {
  const { users, isModalOpen, setIsModalOpen } = props;

  const onFinish = (values) => {
    const userInfo = values.user;
    const data = {
      ...userInfo,
      dateOfPayment: userInfo.dateOfPayment?._d,
      effectiveDate: userInfo.dateOfPayment?._d,
      endDate: userInfo.endDate?._d,
      money: +userInfo.money,
    };
    console.log(data);
  };

  return (
    <div className='createPayment'>
      <Modal
        className='paymentManagement-modal'
        title={<h3>Thanh toán mới</h3>}
        open={isModalOpen}
        footer={false}
        keyboard={false}
        centered
        onCancel={() => setIsModalOpen(false)}
      >
        <Form name='nest-messages' onFinish={onFinish}>
          <Form.Item
            name={['user', 'username']}
            label='Họ và tên:'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên',
              },
            ]}
          >
            <Select
              showSearch
              placeholder='Select a person'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {users &&
                users.map((user) => (
                  <Select.Option value={user.username} key={user.id}>
                    {user.username}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['user', 'dateOfPayment']}
            label='Ngày thanh toán'
            rules={[
              {
                required: true,
                type: 'date',
              },
            ]}
          >
            <DatePicker placeholder='Chọn ngày thanh toán' />
          </Form.Item>
          <Form.Item
            name={['user', 'endDate']}
            label='Ngày kết thúc'
            rules={[
              {
                type: 'date',
                required: true,
              },
            ]}
          >
            <DatePicker placeholder='Chọn ngày kết thúc' />
          </Form.Item>
          <Form.Item
            name={['user', 'money']}
            label='Số tiền'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'content']} label='Nội dung'>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePayment;
