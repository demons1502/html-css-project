import React from 'react';
import { Form } from 'antd';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';

const Reminiscent = ({ form }) => {
  console.log(form);
  return (
    <div className="financialConsultant-reminiscent">
      <span>Tên gợi nhớ</span>
      <Input placeholder="Nhập" />
      <div className="financialConsultant-reminiscent_button">
        <Button className="btn-danger">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default Reminiscent;
