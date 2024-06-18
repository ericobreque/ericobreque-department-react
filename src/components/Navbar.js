import React from 'react';
import {DownOutlined, CreditCardOutlined, QuestionCircleOutlined, BellOutlined, XOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import { Menu } from 'antd';

/**
 * Se divide el navbar en 2 partes, itemsLeft e itemsRight para poder aplicar cada uno de los botones.
 */

const itemsLeft = [
  {
    key: 'home',
    icon: <XOutlined style={{ fontSize: '26px', color: '#000058' }} />,
  },
  {
    label: 'Dashboard',
    key: 'Dashboard',
  },
  {
    label: 'Organización',
    key: 'app',
  },
  {
    label: 'Modelos',
    key: 'Sub1',
    icon: <DownOutlined />,
    children: [
      {
        label: 'Modelo 1',
        key: 'setting:1',
      },
      {
        label: 'Modelo 2',
        key: 'setting:2',
      },
    ],
  },
  {
    label: 'Seguimiento',
    key: 'Sub2',
    icon: <DownOutlined />,
    children: [
      {
        label: 'Seguimiento 1',
        key: 'setting:3',
      },
      {
        label: 'Seguimiento 2',
        key: 'setting:4',
      },
    ],
  },
];

const itemsRight = [
  {
    key: 'icon1',
    icon: <CreditCardOutlined />
  },
  {
    key: 'icon2',
    icon: <QuestionCircleOutlined />,
  },
  {
    key: 'icon3',
    icon: <BellOutlined />,
  },
  {
    label: 'Administrator',
    key: 'Sub3',
    icon: <Button type="primary" shape="circle">A</Button>,
    children: [
      {
        label: 'Administrador 1',
        key: 'setting:5',
      },
      {
        label: 'Administrador',
        key: 'setting:6',
      },
    ],
  },
];

const Navbar = () => {
  return (
    <div className="menuContainer">
        <Menu
        className='menuLeft'
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={itemsLeft}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Menu
        className='menuRight'
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={itemsRight}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
  </div>
  )
}

export default Navbar