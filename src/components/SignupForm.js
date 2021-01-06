import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import {
  MyInput,
  MyButton,
  MyformContainer,
  MyFormBody,
  MyFormHeader,
} from "./styledComponents";
import { Link } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
    }
  }
`;

export default function SignupForm(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [register] = useMutation(REGISTER, {
    onCompleted() {
      setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    register({ variables: { ...state } });
  };

  return (
    <MyformContainer>
      <MyFormHeader>
        <h1>Chat App</h1>
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
            {errors.email ? (
              <label style={{ color: "red" }}>{errors.email}</label>
            ) : (
              <label>Email</label>
            )}
            <MyInput
              name="email"
              value={state.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
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
          <Form.Field>
            {errors.confirmPassword ? (
              <label style={{ color: "red" }}>{errors.confirmPassword}</label>
            ) : (
              <label>Confirm Password</label>
            )}
            <MyInput
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Field>
          <MyButton type="submit">Signup</MyButton>
          <h5>Already have an account? {<Link to="/">Login</Link>}</h5>
        </Form>
      </MyFormBody>
    </MyformContainer>
  );
}
