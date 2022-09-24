import { Column } from '@ant-design/plots';
import React from 'react';

export default function SignedContractPlot(props) {
  const data = [
    {
      type: '10/07',
      sales: 38,
    },
    {
      type: '11/07',
      sales: 52,
    },
    {
      type: '12/07',
      sales: 61,
    },
    {
      type: '13/07',
      sales: 145,
    },
    {
      type: '14/07',
      sales: 48,
    },
    {
      type: '15/07',
      sales: 38,
    },
    {
      type: '16/07',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    legend: {
      position: 'bottom',
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
    theme: {
      styleSheet: {
        brandColor: '#3EBD78',
      },
    },
  };
  return <Column {...config} />;
}
