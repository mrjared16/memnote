import React from 'react';
import './Main.scss';
import { Row, Col } from 'antd';
import LoginForm from '../../components/LoginForm';

function MainPage(props) {
  return (
    <Row className="login-row">
      <Col span={8}></Col>
      <Col span={8} className="login-col">
        <LoginForm />
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default MainPage;