import { Pie } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

const template = [
  {
    type: 'Hợp đồng',
    value: 0,
  },
  {
    type: 'Cuộc hẹn',
    value: 0,
  },
];
export default function RatioContractPie(props) {
  const [data, setData] = useState(template);
  useEffect(() => {
    if (props?.data?.length > 0) {
      let loadData = props.data;
      setData(loadData);
    }
  }, [props.data]);

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#3DBD78', '#e16f5b'],
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v}`,
      },
    },
    height: 350,
    label: {
      content: '',
    },
    legend: {
      position: 'bottom',
      itemName: {
        style: {
          fontSize: 14,
          lineHeight: 18,
          fontFamily: 'Quicksand',
          fontStyle: 'normal',
          fontWeight: 600,
          letterSpacing: 1,
        },
      },
    },
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <div style={{ padding: '10px' }}>
              {items?.map((item, idx) => {
                const { value } = item;
                return (
                  <span key={idx} className="g2-tooltip-list-item-value">
                    {value} {title}
                  </span>
                );
              })}
            </div>
          </>
        );
      },
    },
    statistic: {
      title: false,
      content: false,
    },
    interactions: [
      {
        type: 'tooltip',
        cfg: { start: [{ trigger: 'element:mouseenter', action: 'tooltip:show' }] },
      },
    ],
  };
  return <Pie {...config} />;
}
