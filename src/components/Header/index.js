import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Menu, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import InputSearch from '../common/InputSearch';

import { logout } from '../../slices/auth';
import Logo from '../../assets/images/logo.png';
import AvantarDefault from '../../assets/images/avatar-default.png';
import ArrowDownIcon from '../../assets/images/icons/arrow-down.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';
import SetingIcon from '../../assets/images/icons/setting.svg';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInterval from '../../hooks/useInterval';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function Header() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});
  const titlesHeader = [t('common.slogan'), t('common.support')];
  const [openSearch, setopenSearch] = useState(false);
  const [title, setTitle] = useState(titlesHeader[0]);
  const [curNewtitle, setCurNewtitle] = useState(-1);
  const { me } = useSelector((state) => state.auth);
  const { Header } = Layout;

  useEffect(() => {
    // fetchdata
  }, [payload]);

  useInterval(() => {
    let value = curNewtitle + 1;
    if (value >= titlesHeader.length) {
      value = 0;
    }
    setCurNewtitle(value);
    setTitle(titlesHeader[value]);
  }, 60000);

  const handleLogout = () => {
    dispatch(logout());
  };

  const hanldOpenSearch = () => {
    console.log('dsadsadas');
    width < 1024 && setopenSearch(!openSearch)
  }

  const menu = (
    <Menu
      className='header__menu'
      items={ [
        {
          key: '1',
          label: (
            <div
              onClick={ () => navigate('/setting') }
              className='header__menu__box'
            >
              <img className='header__menu__icon' src={ SetingIcon } />
              <span className='header__menu__text'>{ t('common.setting') }</span>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={ handleLogout } className='header__menu__box'>
              <img className='header__menu__icon' src={ LogoutIcon } />
              <span className='header__menu__text'>{ t('common.logout') }</span>
            </div>
          ),
        },
      ] }
    />
  );

  return (
    <Header className='header'>
      <div className='header__left'>
        <img src={ Logo } alt='' />
        <span>{ t('common.manulife') }</span>
      </div>
      <div className='header__center'>
        <p>{ title }</p>
      </div>

      <div className='header__right'>
        <InputSearch
          onClick={ hanldOpenSearch }
          classStyle={ width < 1024 ? !openSearch ? 'input-narrow-mode' : 'input-focused' : 'input-item-search-dark' }
          setPayload={ setPayload }
        />

        <div className='header__right__user'>
          <span className='header__right__user__name'>{ me.fullname }</span>
          <Dropdown overlay={ menu } placement="bottomRight">
            <div className='header__right__user__avatar'>
              <Avatar size={ 30 } src={ !me.avatar ? AvantarDefault : me.avatar } />
              <div className='header__right__user__box-icon'>
                <img src={ ArrowDownIcon } alt='' />
              </div>
            </div>
          </Dropdown>
        </div>

      </div>
    </Header>
  );
}
