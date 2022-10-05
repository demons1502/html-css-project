import { Select, Checkbox, Form } from 'antd';
import React from 'react';
import InputNumber from '../../../components/common/InputNumber';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';

const ListCalculation = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;
  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="name1"
          label="Tài sản hiện có"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="0" min={0} style={{ width: 152 }} controls={false} />
        </Form.Item>
        <Form.Item
          name="name2"
          label="Kinh nghiệm đầu tư sinh lời"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="0" style={{ width: 152 }} />
        </Form.Item>
        <Form.Item
          name="name3"
          label="Số năm gấp đôi tài sản"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="0" min={0} style={{ width: 152 }} />
        </Form.Item>
      </div>

      <div className="container-right-submit">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Không còn tiềm năng</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Bảng minh họa
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ListCalculation;
