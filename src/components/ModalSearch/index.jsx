import React from 'react';

import { ReactComponent as ArrowRight } from '../../assets/images/icons/fill-arrow-right.svg';
import { ReactComponent as Like } from '../../assets/images/icons/likeIcon.svg';

import * as S from './style';

const ModalSearch = ({ isVisible }) => {
  const { Panel } = S.SearchCollapse;

  const handleExpandIcon = ({ isActive }) => {
    return <ArrowRight className={`${isActive ? 'active' : ''}`} />;
  };

  return (
    <S.SearchDrawer width={560} open={isVisible} placement="right" title="Kết quả tìm kiếm">
      <S.SearchCollapse expandIcon={handleExpandIcon}>
        {/* Map from API */}
        <>
          <Panel
            header={
              <>
                <S.TitleResult>Kết quả 1: </S.TitleResult>
                <S.TitleQuestion>Câu hỏi 1</S.TitleQuestion>
              </>
            }
          >
            <S.QuestionContent>
              <div className="content-top">
                <p className="name">Bảo Nguyễn</p>
                <div className="like-box">
                  <Like />
                  <span>23</span>
                </div>
              </div>
              <div className="content-bot">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas
              </div>
            </S.QuestionContent>
            <S.QuestionContent>
              <div className="content-top">
                <p className="name">Bảo Nguyễn</p>
                <div className="like-box">
                  <Like />
                  <span>23</span>
                </div>
              </div>
              <div className="content-bot">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas
              </div>
            </S.QuestionContent>
          </Panel>
          <S.LineDivider />
        </>
      </S.SearchCollapse>
    </S.SearchDrawer>
  );
};

export default ModalSearch;
