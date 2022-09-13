import React from 'react';

const FinanceKnowledgeNav = (props) => {
  const { title } = props;

  return (
    <div className='financeKnowledge-nav'>
      <div className='financeKnowledge-nav_title'>
        <h3>{title}</h3>
      </div>

      <div className='financeKnowledge-nav_option'>{}</div>
    </div>
  );
};

export default FinanceKnowledgeNav;
