import React from 'react';
import LeftSidebar from './pages/LeftSidebar';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import NoteViewer from './pages/NoteViewer';
import TrashNote from './pages/TrashNote';
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
          <Route path="/note/:id" component={NoteViewer} />
          <Route path="/trash" component={TrashNote}/>
        </Layout>
      </Layout>
    </>
  );
}

export default Note;