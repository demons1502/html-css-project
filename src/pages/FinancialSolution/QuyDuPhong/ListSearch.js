import { Col, Input } from 'antd'
import React from 'react'
import Search from '../../../assets/images/financial/Search';

const ListSearch = () => {
  // const [payload, setPayload] = useState('');

  return (
    <>
      <Col span={8}>
        <p>Người tham gia</p>
        <Input size="large" className='input-item-search' placeholder="Tìm kiếm" prefix={<Search />} />
      </Col>
    </>
  )
}

export default ListSearch