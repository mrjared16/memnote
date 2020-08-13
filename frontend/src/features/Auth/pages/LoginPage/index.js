import React from "react";
import "./LoginPage.scss";
import { Row, Col } from "antd";
import LoginForm from "../../components/LoginForm";
import { setToken } from "../../authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authApi from "../../../../api/authApi";

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (values) => {
    const { username, password } = values;
    const response = await authApi.login({
      username,
      password,
    });
    const loginCheck = true;
    if (!loginCheck) {
      return;
    }

    dispatch(setToken("token"));
    history.push("/");
  };

  return (
    <Row className="login-row">
      <Col span={8}></Col>
      <Col span={8} className="login-col">
        <LoginForm onSubmit={handleLogin} />
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default LoginPage;
