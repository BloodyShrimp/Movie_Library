import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const initialValuesLogin = {
    username: "",
    password: "",
  };

  const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchemaLogin = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long")
      .max(15, "Password must be at most 15 characters long"),
  });

  const validationSchemaRegister = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long")
      .max(15, "Password must be at most 15 characters long"),
  });

  const onSubmitLogin = (data) => {
    axios.post("http://localhost:8080/users/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.userId,
          status: true,
        });
        navigate("/");
      }
    });
  };

  const onSubmitRegister = (data, args) => {
    axios.post("http://localhost:8080/users", data).then((res) => {
      args.resetForm();
    });
  };

  return (
    <div className="LoginRegisterPage">
      <div className="LoginField">
        <h2 id="LoginHeader">Login</h2>
        <Formik
          initialValues={initialValuesLogin}
          onSubmit={onSubmitLogin}
          validationSchema={validationSchemaLogin}
        >
          <Form className="LoginForm">
            <ErrorMessage name="username" component="span" />
            <Field id="input" name="username" placeholder="Username" />

            <ErrorMessage name="password" component="span" />
            <Field
              type="password"
              id="input"
              name="password"
              placeholder="Password"
              autocomplete="off"
            />

            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>

      <div className="RegisterField">
        <h2 id="LoginHeader">Register</h2>
        <Formik
          initialValues={initialValuesRegister}
          onSubmit={onSubmitRegister}
          validationSchema={validationSchemaRegister}
        >
          <Form className="RegisterForm">
            <ErrorMessage name="username" component="span" />
            <Field id="input" name="username" placeholder="Username" />

            <ErrorMessage name="email" component="span" />
            <Field id="input" name="email" placeholder="Email" />

            <ErrorMessage name="password" component="span" />
            <Field
              type="password"
              id="input"
              name="password"
              placeholder="Password"
              autocomplete="off"
            />

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
