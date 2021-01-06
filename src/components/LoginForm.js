import React, { useState } from "react";
import {
  MyformContainer,
  MyFormBody,
  MyFormHeader,
  MyInput,
  MyButton,
} from "./styledComponents";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { gql, useLazyQuery } from "@apollo/client";

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      token
    }
  }
`;

export default function LoginForm(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [login] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      setState({
        username: "",
        password: "",
      });
      setErrors({});
      window.location.reload();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    login({ variables: { ...state } });
  };
  return (
    <MyformContainer>
      <MyFormHeader>
        <img alt="Logo" height="80px" width="80px" src="./logo.png" />
      </MyFormHeader>
      <MyFormBody>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            {errors.username ? (
              <label style={{ color: "red" }}>{errors.username}</label>
            ) : (
              <label>Username</label>
            )}
            <MyInput
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            {errors.password ? (
              <label style={{ color: "red" }}>{errors.password}</label>
            ) : (
              <label>Password</label>
            )}
            <MyInput
              name="password"
              value={state.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          <MyButton type="submit">Login</MyButton>
          <h5>Create an account? {<Link to="/signup">Signup</Link>}</h5>
        </Form>
      </MyFormBody>
    </MyformContainer>
  );
}
