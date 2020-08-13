import React from 'react';
import './LoginPage.scss';
import { Row, Col } from 'antd';
import LoginForm from '../../components/LoginForm';
import { setAuthenticated } from "../../loginSlice";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = (values) => {
    console.log(values);
    dispatch(setAuthenticated(true));
    history.push("/");
  };
  return (
    <Row className="login-row">
      <Col span={8}></Col>
      <Col span={8} className="login-col">
        <LoginForm onSubmit={handleLogin}/>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default LoginPage;