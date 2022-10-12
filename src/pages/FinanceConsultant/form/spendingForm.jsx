import { Checkbox, Form, message, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DotImg from '../../../assets/images/icons/dot.svg';
import InputNumber from '../../../components/common/InputNumber';
import { Button } from '../../../components/styles';
import { formatDataNumber } from '../../../helper';
import { AddNewConsultant } from '../../../slices/financialConsultant';
import Reminiscent from './Reminiscent';

const spendingForm = (props) => {
  const { id, useSelected, setKeywords } = props;

  const [reminiscent, setReminiscent] = useState(null);
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(null);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = (values) => {
    const consultAttrs = [];
    for (const key of Object.keys(values)) {
      consultAttrs.push({ label: key, value: values[key] > 0 ? values[key] : 0 });
    }
    if (!id) {
      message.error('Vui lòng chọn khách hàng', 3);
      return;
    }
    if (total <= 0) {
      message.error('Vui lòng nhập số tiền', 3);
      return;
    }

    const info = {
      title: reminiscent,
      total: total,
      customerId: id,
      isPotential: checked,
      consultAttrs: consultAttrs,
    };
    if (!reminiscent) {
      message.error('Vui lòng nhập tên gợi nhớ', 3);
      return;
    } else {
      dispatch(AddNewConsultant(info));
      form.resetFields();
      setTotal(0);
      setReminiscent(null);
      setOpen(false);
    }
  };

  const onOk = () => {
    form.submit();
  };

  const handleChange = (values) => {
    setData({ ...data, ...values });
  };

  useEffect(() => {
    setKeywords({ expensePerMonth: total > 0 ? total : 0, increaseIncomePerMonth: total / 0.55 });
  }, [total]);

  useEffect(() => {
    const count = data && Object.values(data).reduce((curr, acc) => curr + acc, 0);
    setTotal(count);
  }, [data]);

  return (
    <div className="financialConsultant-content">
      <div className="financialConsultant-form_header">
        <h3>Danh mục chi tiêu</h3>
      </div>
      <Form
        form={form}
        labelCol={{
          span: 19,
        }}
        wrapperCol={{
          span: 5,
        }}
        layout="horizontal"
        onFinish={handleFinish}
        className="financialConsultant-form"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền chợ</span>
            </p>
          }
          labelAlign="left"
          name="marketMoney"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền học</span>
            </p>
          }
          labelAlign="left"
          name="studyMoney"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền bỉm, sữa, quà vặt cho con</span>
            </p>
          }
          labelAlign="left"
          name="giftMoney"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Tiền ga, điện, nước, mạng</span>
            </p>
          }
          labelAlign="left"
          name="gasMoney"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí giao tế</span>
            </p>
          }
          labelAlign="left"
          name="cost"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí cá nhân</span>
            </p>
          }
          labelAlign="left"
          name="personalCosts"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Thanh toán lãi vay, thẻ tín dụng</span>
            </p>
          }
          labelAlign="left"
          name="credit"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Quỹ nuôi dưỡng cha mẹ già yếu</span>
            </p>
          }
          labelAlign="left"
          name="nurturingFund"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              <img src={DotImg} alt="dot" /> <span>Chi phí khác....</span>
            </p>
          }
          labelAlign="left"
          name="otherCosts"
        >
          <InputNumber
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập"
          />
        </Form.Item>
        <div className="financialConsultant-form_total">
          <p>Tổng chi tiêu: </p>
          <span>{formatDataNumber(total)}</span>
        </div>
        <div className="financialConsultant-form_submit">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
            Không còn tiềm năng
          </Checkbox>
          <Popover
            placement="topRight"
            content={
              <Reminiscent
                form={form}
                onOk={onOk}
                reminiscent={reminiscent}
                setReminiscent={setReminiscent}
                setOpen={setOpen}
                setTotal={setTotal}
              />
            }
            trigger="click"
            open={open}
            onOpenChange={(e) => setOpen(e)}
          >
            <Button type="primary">Lưu thông tin</Button>
          </Popover>
        </div>
      </Form>
    </div>
  );
};

export default spendingForm;
