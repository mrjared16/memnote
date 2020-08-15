import React from 'react';
import LeftSidebar from './pages/LeftSidebar';
import { Layout } from 'antd';
import './index.scss';

const { Sider } = Layout;

function Note() {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className='sidebar'>
          <LeftSidebar />
        </Sider>
        {/* <Layout>

        </Layout> */}
      </Layout>
    </>
  );
}

export default Note;