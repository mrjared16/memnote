import React from "react";
import "./RegisterPage.scss";
import { Row, Col } from "antd";
import RegisterForm from "../../components/RegisterForm";
import { setToken } from "../../authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authAPI from "../../../../api/authAPI";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = async (values) => {
    const { username, password, email } = values;
    const params = {
      username,
      password,
      email
    }
    authAPI.register(params).then(res => {
      dispatch(setToken(res));
      history.push('/');
    })
  };

  return (
    <Row className="login-row">
      <Col span={8}></Col>
      <Col span={8} className="login-col">
        <RegisterForm onSubmit={handleRegister} />
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}

export default RegisterPage;
