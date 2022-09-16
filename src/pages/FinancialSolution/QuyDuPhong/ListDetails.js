import { Button, Card, Col } from 'antd'
import React from 'react'
import DotImg from "../../../assets/images/icons/dot.svg"

const ListDetails = () => {
  return (
    <Col span={12} className="quy_list_details">
      <Card className='card__radius' title="Lời thoại">
        <Button type="primary" className="btn-primary" >Lời thoại 1</Button>
        <div className="financial-solution__content">
          <p><img src={DotImg} alt="dot" /> Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.</p>
          <p><img src={DotImg} alt="dot" /> Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tìm hiểu thêm thông tin</p>
          <p><img src={DotImg} alt="dot" /> Ngoài ra việc khảo sát không bị ràng buộc bởi mua và bán.</p>
          <p><img src={DotImg} alt="dot" /> Vậy em xin gặp chị và 7 giờ tối nay hay 9 giờ sáng thứ 7, qua nền tảng Zoom hay Google Meet thì tiện cho chị nhất?</p>
          <p><img src={DotImg} alt="dot" /> Thưa chị xxxx, Manulife hiện đang có công cụ tài chính đặc biệt giúp khách hàng quản trị tốt vận may và chuyển giao sự thịnh vượng cho thế hệ thứ 2 một cách trọn vẹn.</p>
          <p><img src={DotImg} alt="dot" /> Chính vì thế em muốn chia sẻ những lợi ích này cùng chị và gia đình. Việc khảo sát này chỉ mất khoảng 10 phút mà thôi trừ khi chị muốn tìm hiểu thêm thông tin.</p>
          <p><img src={DotImg} alt="dot" /> Ngoài ra việc khảo sát không bị ràng buộc bởi mua và bán.</p>
          <p><img src={DotImg} alt="dot" /> Vậy em xin gặp chị và 7 giờ tối nay hay 9 giờ sáng thứ 7, qua nền tảng Zoom hay
            Google Meet thì tiện cho chị nhất?</p>
        </div>
        <p></p>
      </Card>
    </Col >
  )
}

export default ListDetails