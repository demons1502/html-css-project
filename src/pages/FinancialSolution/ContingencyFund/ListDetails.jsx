import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import DotImg from "../../../assets/images/icons/dot.svg";

const ListDetails = ({ data }) => {
  console.log(data);
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    setDatas(data);
  }, [data]);

  return (
    <Card className="content-div-2-header" title="Lời thoại">
      <Button type="primary" htmlType="submit" className="btn-primary">
        Lời thoại 1
      </Button>
      <div className="content-div-2-content">
        {datas && (
          <>
            <p style={{fontSize:'14px',display:'flex', alignItems:'baseline'}}>
              {" "}
              <img src={DotImg} alt="dot" /><span dangerouslySetInnerHTML={{ __html: datas?.objective }} />
            </p>
            <p style={{fontSize:'14px',display:'flex', alignItems:'baseline'}}>
              {" "}
              <img src={DotImg} alt="dot" /><span dangerouslySetInnerHTML={{ __html: datas?.procedure }} />
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default ListDetails;
