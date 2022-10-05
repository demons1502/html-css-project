import React from 'react';
import { Form } from 'antd';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';

const Reminiscent = ({ form, onOk, setReminiscent, setOpen, setTotal, reminiscent }) => {
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setTotal(0);
  };

  return (
    <div className="financialConsultant-reminiscent">
      <span>Tên gợi nhớ</span>
      <Input placeholder="Nhập" onChange={(e) => setReminiscent(e.target.value)} value={reminiscent} />
      <div className="financialConsultant-reminiscent_button">
        <Button className="btn-danger" onClick={handleCancel}>
          Hủy
        </Button>
        <Button type="primary" onClick={() => onOk()}>
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default Reminiscent;
