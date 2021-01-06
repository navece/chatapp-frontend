import React from "react";
import { Mycontainer } from "./components/styledComponents";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Chat from "./components/Chat";
import SignupForm from "./components/SignupForm";

export default function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Mycontainer>
        {token ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={LoginForm} />
        )}
        {token ? <Route exact path="/:id" component={Chat} /> : null}
        {!token ? <Route exact path="/signup" component={SignupForm} /> : null}
      </Mycontainer>
    </BrowserRouter>
  );
}
