import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title';
import TableCommon from '../../components/TableCommon';
import FilterCommon from '../../components/FilterCommon';
import ProgressBar from '../../components/ProgressBar';
import PaginationCommon from '../../components/PaginationCommon';
import { createData, retrieveData } from '../../reducer/customerCare';
import { RootState } from '../../store';
import { IPayload } from '../../helper/types';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
},
{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
},
];

const options = [
{ label: 'Apple', value: 'Apple' },
{ label: 'Pear', value: 'Pear' },
{ label: 'Orange', value: 'Orange' },
];

export default function CustomerCare() {
    const customerCare = useSelector((state: RootState) => state.customerCare);
    const [customer] = useState<IPayload>({
      id: 1,
      title: 'user'
    });
    const dispatch: any = useDispatch();

    const saveTutorial = (e: any) => {     
      dispatch(createData({
        id: 1,
        title: e.target.value
      }))
    }

    const initFetch = useCallback(() => {
      dispatch(retrieveData());
    }, [dispatch])
  
    useEffect(() => {
      console.log(initFetch);
      initFetch()
    }, [initFetch])

    return (
        <div>
             <Title title='Title' />
             <FilterCommon options={options} />
             <ProgressBar percent={100} /> 
            <input type="text" onChange={saveTutorial}/>
            <div className='content-box'>
                <TableCommon dataSource={dataSource} columnTable={columns}></TableCommon>
             </div>
        </div>
    );
}
