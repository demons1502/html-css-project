import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import InputSearch from '../InputSearch';
import Logo from '../../assets/images/logo.png';

export default function Header () {
    const {t} = useTranslation();
    const [payload, setPayload] = useState({});

    useEffect(() => {
        // fetchdata
    }, [payload])

    return (
        <div className='header'>
            <div className='header__left'>
                <img src={Logo} alt="" />
                <span>{t('common.manulife')}</span>
            </div>
            <div className='header__center'>
                <p>{t('common.slogan')}</p>
            </div>
            <div className='header__right'>
                <InputSearch classStyle='input-item-search-dark' setPayload={setPayload}/> 
                <div className='header__right--user'>
                    <span>user</span>
                    <img src={Logo} alt="" />
                </div>
            </div>
        </div>
    )
}