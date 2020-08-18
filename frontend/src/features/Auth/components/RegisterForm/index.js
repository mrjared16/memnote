import React from "react";
import Title from "../../../../components/Title";
import InputField from "../../../../components/InputField";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./RegisterForm.scss";
import { Formik, Form, FastField } from "formik";

function RegisterForm(props) {
  const initialValues = {
    username: "",
    password: "",
    email: ""
  };
  const { onSubmit } = props;

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => {
          //const { values } = formikProps;
          return (
            <Form className="login-form">
              <Title name="Login" />

              <FastField
                component={InputField}
                name="username"
                placeholder="Username"
              />

              <FastField
                component={InputField}
                name="email"
                placeholder="Email"
              />

              <FastField
                component={InputField}
                name="password"
                placeholder="Password"
                type="password"
              />

              <FastField
                component={InputField}
                name="confirm-password"
                placeholder="Confirm Password"
                type="password"
              />

              <div className="loginBtn-signup">
                <Button className="login-btn" htmlType="submit">
                  Register
                </Button>
                <Link className="signup" to="/login">Already have an account? Log in</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegisterForm;
