import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreatePayment = (props) => {
  const { users, isModalOpen, setIsModalOpen, onClick } = props;

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
        <Form name='nest-messages' onFinish={onClick}>
          <Form.Item
            name={['payment', 'username']}
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
                  <Select.Option value={user.id} key={user.id}>
                    {user.userFullname}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['payment', 'dateOfPayment']}
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
            name={['payment', 'endDate']}
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
            name={['payment', 'money']}
            label='Số tiền'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['payment', 'content']} label='Nội dung'>
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
