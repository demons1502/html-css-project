import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import DotImg from "../../assets/images/icons/dot.svg";
import { listDatas } from "../../assets/fake-data/QuyDuPhongData";
import { useTranslation } from "react-i18next";

const ListDetails = () => {
  const { t } = useTranslation();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(listDatas);
  }, []);
  return (
    <Card className="content-div-2-header" title={t("survey.rttitle")}>
      <Button type="primary" htmlType="submit" className="btn-primary">
        Lời thoại 1
      </Button>
      <div className="content-div-2-content">
        {datas !== undefined &&
          datas.map((data, i) => (
            <p key={i}>
              {" "}
              <img src={DotImg} alt="dot" /> <span> {data?.content}</span>
            </p>
          ))}
      </div>
    </Card>
  );
};

export default ListDetails;
