import React from 'react';
import { Button } from 'antd';
import './LoginBtn.scss';

function LoginBtn(props) {
  return (
    <Button className="login-btn" htmlType="submit">Login</Button>
  );
}

export default LoginBtn;