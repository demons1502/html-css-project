import React from 'react';
import {Progress} from 'antd';

export default function ProgressBar(props) {
  const {percent} = props;

  return <Progress percent={percent}/>
}