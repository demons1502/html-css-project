import { Button, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DotImg from '../../assets/images/icons/dot.svg';

const ListDetails = () => {
  const { t } = useTranslation();
  const { surveys } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const { objective, procedure, dialogues } = surveys?.surveyScript;

  useEffect(() => {
    if (objective && procedure && dialogues?.length > 0) {
      let pageLimit = 2 + dialogues.length;
      setLimit(pageLimit);
    } else if (
      (objective && procedure) ||
      (!objective && procedure && dialogues?.length > 0) ||
      (objective && !procedure && dialogues?.length > 0)
    ) {
      setLimit(1 + dialogues.length);
    } else if (!objective && !objective && dialogues?.length > 0) {
      setLimit(dialogues.length);
    } else {
      setLimit(1);
    }
  }, [surveys?.surveyScript]);

  const nextPage = () => {
    if (page < limit) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  const getContent = (page) => {
    if (objective) {
      if (page === 1) {
        return <div dangerouslySetInnerHTML={{ __html: objective }} />;
      } else if (procedure) {
        if (page === 2) {
          return <div dangerouslySetInnerHTML={{ __html: procedure }} />;
        } else {
          return dialogues?.length > 0 ? <DialogItem dialogues={dialogues} page={page - 3} /> : '';
        }
      }
    } else if (!objective && procedure) {
      if (page === 1) {
        return <div dangerouslySetInnerHTML={{ __html: procedure }} />;
      } else {
        return dialogues?.length > 0 ? <DialogItem dialogues={dialogues} page={page - 2} /> : '';
      }
    } else if (!objective && !procedure && dialogues?.length > 0) {
      return <DialogItem dialogues={dialogues} page={page - 1} />;
    } else {
      return '';
    }
  };

  const getTitle = (page) => {
    if (objective) {
      if (page === 1) {
        return 'Mục tiêu';
      } else if (procedure) {
        if (page === 2) {
          return 'Quy trình';
        } else {
          return 'Lời thoại ' + (page - 2);
        }
      }
    } else {
      return 'Lời thoại ' + page;
    }
  };

  return (
    <Card className="content-div-2-header" title={t('survey.rttitle')}>
      <div className="content-div-2-content">
        <div className="content-body">
          <Button type="primary" htmlType="submit" className="btn-primary">
            {getTitle(page)}
          </Button>
          <div className="contents">{getContent(page)}</div>
        </div>

        <div className="footer">
          <div className="buttons">
            <span className="prev-btn-text">Trước</span>
            <Button
              className="prev-btn"
              htmlType="button"
              onClick={prevPage}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
                  <path
                    d="M11.5667 2.80625L4.88748 9.5L11.5667 16.1938L9.5104 18.25L0.7604 9.5L9.5104 0.75L11.5667 2.80625Z"
                    fill={`${page === 1 ? '#C4CDD5' : '#3DBD78'}`}
                  />
                </svg>
              }
            ></Button>

            <Button
              className="next-btn"
              htmlType="button"
              onClick={nextPage}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
                  <path
                    d="M0.43335 2.80625L7.11252 9.5L0.43335 16.1938L2.4896 18.25L11.2396 9.5L2.4896 0.75L0.43335 2.80625Z"
                    fill={`${page < limit ? '#3DBD78' : '#C4CDD5'}`}
                  />
                </svg>
              }
            ></Button>

            <span className="next-btn-text">Tiếp</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListDetails;

const DialogItem = ({ dialogues, page }) => {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: dialogues?.[page]?.text }} />
    </div>
  );
};