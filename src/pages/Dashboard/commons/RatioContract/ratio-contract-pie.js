import { measureTextWidth, Pie } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

const template = [
  {
    type: 'Cuộc hẹn có hợp đồng',
    value: 0,
  },
  {
    type: 'Cuộc hẹn không có hợp đồng',
    value: 0,
  },
];
export default function RatioContractPie(props) {
  const [data, setData] = useState(template);
  useEffect(() => {
    if (props?.data?.length > 0) {
      let loadData = props.data;
      const countDataRemove = loadData.filter((item) => item.value === 0);
      if (countDataRemove.length === 1) {
        loadData = loadData.filter((item) => item.value > 0);
      }
      setData(loadData);
    }
  }, [props.data]);

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="font-size:14px;height:20px;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

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
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    legend: {
      position: 'bottom',
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
                    {value} hợp đồng
                  </span>
                );
              })}
            </div>
          </>
        );
      },
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? 'Hợp đồng/cuộc hẹn' : 'Tổng';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${Math.floor((datum.value / data.reduce((r, d) => r + d.value, 0) || 0) * 100)}%`
            : data.reduce((r, d) => r + d.value, 0);
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
      {
        type: 'tooltip',
        cfg: { start: [{ trigger: 'element:mouseenter', action: 'tooltip:show' }] },
      },
    ],
  };
  return <Pie {...config} />;
}
