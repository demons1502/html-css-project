import { Column } from '@ant-design/plots';
import React from 'react';

export default function SignedContractPlot(props) {
  const { data } = props;
  const config = {
    data,
    xField: 'startDate',
    yField: 'count',
    columnStyle: {
      radius: 10,
    },
    height: 310,
    label: {
      position: 'middle',
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
      startDate: {
        alias: 'Ngày',
      },
      count: {
        alias: 'Hợp đồng',
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
