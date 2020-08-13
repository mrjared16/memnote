import React from "react";
import Title from "../../../../components/Title";
import InputField from "../../../../components/InputField";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./LoginForm.scss";
import { Formik, Form, FastField } from "formik";

function LoginForm(props) {
  const initialValues = {
    username: "",
    password: "",
  };
  const { onSubmit } = props;

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => {
          //const { values } = formikProps;
          return (
            <Form>
              <Title name="Login" />
              
              <FastField
                component={InputField}
                name="username"
                placeholder="Email"
              />

              <FastField
                component={InputField}
                name="password"
                placeholder="Password"
                type="password"
              />

              <Link className="forgot-password" href="#">
                Forgot password?
              </Link>
              <div className="loginBtn-signup">
                <Button className="login-btn" htmlType="submit">Login</Button>
                <Link className="signup">Don't have an account? Sign up</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
