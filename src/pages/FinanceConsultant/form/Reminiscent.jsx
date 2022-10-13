import React from 'react';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';

const Reminiscent = ({ form, onOk, setHintName, setOpen, setTotal, hintName }) => {
  const handleCancel = () => {
    // form.resetFields();
    setOpen(false);
    setTotal(0);
  };

  return (
    <div className="financialConsultant-reminiscent">
      <span>Tên gợi nhớ</span>
      <Input placeholder="Nhập" onChange={(e) => setHintName(e.target.value)} value={hintName} />
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
