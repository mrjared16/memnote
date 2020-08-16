import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function Loading(props) {
    return (
        <Spin indicator={<LoadingOutlined spin/>}>
        </Spin>
    );
}
export default Loading;