import React from 'react';
import LeftSidebar from './pages/LeftSidebar';
import { Layout } from 'antd';
import NoteViewer from './pages/NoteViewer';
import './index.scss';

const { Sider } = Layout;

function Note() {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className='sidebar'>
          <LeftSidebar />
        </Sider>
        <Layout className='main-content'>
          <NoteViewer/>
        </Layout>
      </Layout>
    </>
  );
}

export default Note;