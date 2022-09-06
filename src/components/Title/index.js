import React from 'react';

export default function Title(props) {
  const {title} = props;
  return (
    <div className='title'>
      <h3>{title}</h3>
    </div>
  )
}