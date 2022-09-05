import {Input} from 'antd';
import SearchIcon from '../../assets/images/icons/green-search.svg';

export default function InputSearch (props: any) {
    const { classStyle, setPayload } = props;

    const handleSearch = (e: any) => {
        setPayload(e.target.value)
    }
 
    return (<Input onPressEnter={handleSearch} className={classStyle} prefix={<img src={SearchIcon} alt="" />} />)
}