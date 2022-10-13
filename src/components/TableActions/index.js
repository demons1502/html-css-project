import React from 'react';
import { Button, Row, Tooltip } from 'antd';
import { ReactComponent as Call } from '../../assets/images/icons/call-light.svg';
import { ReactComponent as Delete } from '../../assets/images/icons/delete-light.svg';
import { ReactComponent as Edit } from '../../assets/images/icons/edit.svg';

export default function TableActions({ handleCall, handleDelete, handleEdit }) {
  return (
    <Row justify="space-between" align="middle">
      <Tooltip title="Chuyển sang lịch gọi điện">
        <Button size="large" onClick={handleCall} type="text" icon={<Call width={'100%'} height="20px" />} />
      </Tooltip>
      <Tooltip title="Xoá">
        <Button size="large" onClick={handleDelete} type="text" icon={<Delete width={'100%'} height="20px" />} />
      </Tooltip>
      <Tooltip title="Chỉnh sửa">
        <Button size="large" onClick={handleEdit} type="text" icon={<Edit width={'100%'} height="20px" />} />
      </Tooltip>
    </Row>
  );
}
