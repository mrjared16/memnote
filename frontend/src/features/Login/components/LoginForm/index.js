import React from 'react';
import Title from '../../../../components/Title';
import InputField from '../../../../components/InputField';
import { Link, useHistory } from 'react-router-dom';
import LoginBtn from '../../components/LoginBtn';
import { Form } from 'antd';
import './LoginForm.scss';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../loginSlice';

function LoginForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(setAuthenticated(true));
    history.push("/");
  }

  return (
    <div>
      <Form
      onFinish={handleSubmit}
      >
        <Title name="Login" />
        <InputField placeholder="Email" />
        <InputField type="password" placeholder="Password" />
        <Link className="forgot-password" href="#">Forgot password?</Link>
        <div className="loginBtn-signup">
          <LoginBtn />
          <Link className="signup">Don't have an account? Sign up</Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;