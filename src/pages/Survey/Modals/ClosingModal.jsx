import React, { useState, useEffect } from "react";
import { Button, Popover, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { Input, FieldLabel } from "../../../components/controls";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

export const ClosingModal = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();
  const { survey } = useSelector((state) => state?.surveys);
  const [hintName, setHintName] = useState('');

  const { customers } = useSelector((state) => state);
  const { selectedCustomer } = customers;

  useEffect(() => {
    setHintName(survey?.hintName)
  }, []);
  
  useEffect(() => {
    if (!isEmpty(survey)) {
      onCancel();
    }
  }, [survey]);

  useEffect(() => {
    setHintName(survey?.hintName)
  }, [selectedCustomer, survey]);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const content = (
    <div className="closing-container">
      <div className="closing-body">
        <div className="form-group">
          <FieldLabel name="hintName" label="Tên gợi nhớ" />
          <Input control={control} name="hintName" className="form-control" value={hintName} />
        </div>
      </div>
      <Divider />
      <div className="closing-footer">
        <div className="closing-btn">
          <Button htmlType="button" className="btn-cancel" block onClick={onCancel} onBlur={onCancel}>
            Hủy
          </Button>
        </div>

        <div className="closing-btn">
          <Button type="primary" htmlType="button" className="btn-primary" block onClick={onSubmit}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <Popover
      placement="bottomRight"
      content={content}
      trigger="click"
      onOpenChange={handleOpenChange}
      overlayClassName="closing-popover"
      visible={open}
    >
      <Button type="primary" htmlType="button" className="btn-primary finance-btn-small" block>
        {t("survey.save")}
      </Button>
    </Popover>
  );
};