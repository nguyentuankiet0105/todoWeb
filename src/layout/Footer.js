import * as React from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import '../Style/Footer.css'

const Footer = () => {
    return (
        <div id='footer'>
            <Pagination defaultCurrent={1} total={50} />
        </div>

    )
}
export default Footer