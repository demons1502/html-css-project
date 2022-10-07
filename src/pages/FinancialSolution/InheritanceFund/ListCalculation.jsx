import { Checkbox, Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import InputNumber from '../../../components/common/InputNumber';
import { Button } from '../../../components/styles';
import { formatDataNumber } from '../../../helper';

const ListCalculation = ({typeFund, userSelected}) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    navigate("/advise/financial-solutions/minh-hoa-gia", {state:{values: values,total:'0', typeFund:typeFund, userSelected:userSelected}});
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className="container-right-middle">
        <Form.Item
          name="moneyAvailable"
          label="Tài sản hiện có"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="0" min={0} style={{ width: 152 }} controls={false}
            formatter={(e) =>
              `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(e) => e.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="experience"
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
          name="yearToTwiceMoney"
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
