import React, { useState } from "react";
import "./LoginPage.scss";
import { Row, Col, Alert, message } from "antd";
import LoginForm from "../../components/LoginForm";
import { setToken } from "../../authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authAPI from "../../../../api/authAPI";

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [notify, setNotify] = useState('');

  const handleLogin = (values) => {
    const { username, password } = values;
    const params = {
      username,
      password
    }
    setNotify('');
    authAPI.login(params).then(res => {
      dispatch(setToken(res));
      history.push('/');
    }).catch((err) => {
      setNotify(err.response.data.message);
    })
  };

  return (
    <Row className="login-row">
      <Col span={8}></Col>
      <Col span={8} className="login-col">
        <LoginForm onSubmit={handleLogin} notify={notify}/>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default LoginPage;
