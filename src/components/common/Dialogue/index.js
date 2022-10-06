import React, { useState, useEffect, useRef } from "react";
import { getSpeechScript } from "../../../services/common";
import { Button } from "../../styles";
import { Card, Carousel } from "./styles";

const Dialogue = (props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);

  const dialogItems = useRef();
  const [dialogData, setDialogData] = useState(null);

  useEffect(() => {
    const getSpeedScript = async () => {
      try {
        const res = await getSpeechScript(props.type);
        let count = 0;
        setDialogData(res.data);
        if (res.data) {
          if (res.data?.objective) {
            count = 1;
          }
          if (res.data?.procedure) {
            count += 1;
          }
          if (res.data?.dialogues) {
            res.data.dialogues.map((item) => {
              count += 1;
            });
          }
          setLimit(count);
        }
      } catch (error) {
        setDialogData(null);
      }
    }
    getSpeedScript();
  }, []);

  const nextPage = () => {
    console.log(page);
    console.log(limit);
    if (page < limit - 1) {
      dialogItems.current.next();
    }
  };

  const prevPage = () => { 
    if (page > 0) {
      dialogItems.current.prev();
    }
  };

  const afterChangeDialogItem = (current) => {
    setPage(current);
  }

  const getContent = () => {
    let dialogItems = [];
    if (dialogData) {
      if (dialogData?.objective) {
        dialogItems.push(<DialogItem key="0" title="Mục tiêu" content={dialogData?.objective}/>);
      }
      if (dialogData?.procedure) {
        dialogItems.push(<DialogItem key="1" title="Quy trình" content={dialogData?.procedure}/>);
      }
      if (dialogData?.dialogues) {
        dialogData.dialogues.map((item, index) => {
          dialogItems.push(<DialogItem key={`${index + 2}`} title={item.label} content={item.text}/>);
        });
      }
      
      return dialogItems;
    }

    return [];
  };

  return (
    <Card title={ props.title }>
      <div className="content-body">
        <Carousel ref={dialogItems} afterChange={afterChangeDialogItem}>
          {
            getContent().map((val, index) => {
              return val
            })
          }
        </Carousel>
      </div>
      <div className="footer">
        <div className="buttons">
          <span className={`prev-btn-text ${page > 0 ?"text-active": ""}`}>Trước</span>
          <Button
            className={`prev-btn ${page > 0 ?"btn-active": ""}`}
            htmlType="button"
            onClick={prevPage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
                <path
                  d="M11.5667 2.80625L4.88748 9.5L11.5667 16.1938L9.5104 18.25L0.7604 9.5L9.5104 0.75L11.5667 2.80625Z"
                  fill={`${page === 0 ? "#C4CDD5" : "#3DBD78"}`}
                />
              </svg>
            }
          ></Button>

          <Button
            className={`next-btn ${page < limit - 1 ?"btn-active": ""}`}
            htmlType="button"
            onClick={nextPage}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
                <path
                  d="M0.43335 2.80625L7.11252 9.5L0.43335 16.1938L2.4896 18.25L11.2396 9.5L2.4896 0.75L0.43335 2.80625Z"
                  fill={`${page < limit - 1 ? "#3DBD78" : "#C4CDD5" }`}
                />
              </svg>
            }
          ></Button>

          <span className={`next-btn-text ${page < limit - 1 ?"text-active": ""}`}>Tiếp</span>
        </div>
      </div>
    </Card>
  );
};

export default Dialogue;

const DialogItem = (props) => {
  return (
    <div>
      <Button type="primary" htmlType="submit" className="btn-primary">
        {props.title}
      </Button>
      <div className="contents" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </div>
  );
};
