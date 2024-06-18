import React from 'react';
import { Button } from 'antd';
import {DownloadOutlined, PlusOutlined} from '@ant-design/icons';

const HeaderS = () => {
  return (
<div className='headerItems'>
    <div className='headertext'>
       <h3 className='titleH'>Organización</h3>
       <div className='headerlinks'>
            <p className="text">Divisiones</p>
            <p className="text">Colaboradores</p>
       </div>
    </div>
    <div className='iconsH'>
        <Button type="primary" icon={<PlusOutlined />} />
        <Button className="icons" type="secondary" icon={<DownloadOutlined />} />
        <Button className="icons" type="secondary" icon={<DownloadOutlined />} />
    </div>
</div>
  )
}

export default HeaderS