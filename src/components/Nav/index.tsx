import {useState, useEffect} from 'react';
import {Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {PrivateRoutes} from '../../routes';

export default function Nav() {
  const location = useLocation();
  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(location.pathname.split('/')[1])
  }, [location.pathname])

  return (
    <Menu
    className='nav'
    onClick={(e: any) => setCurrent(e.key)}
    selectedKeys={[current]}
    mode='horizontal'>
      {PrivateRoutes?.map((item: any) => (
        !item.children ?
          <Menu.Item key={item.key}>
            <Link to={item.path}>
                <img src={item.icon} />
                <span>{item.label}</span>
            </Link>
          </Menu.Item>
        :
        <Menu.SubMenu key={item.key} title={item.label} icon={<img src={item.icon} />}>
          {
            item.children.map((child: any) => {
              return <Menu.Item key={child.key}>
                <Link to={child.path}>
                  <span>{child.label}</span>
                </Link>
              </Menu.Item>
            })
          }
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}
