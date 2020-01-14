import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "20px"
};
const SocLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  const Submit = e => {
    e.preventDefault();
    console.log(password, email);
    fetch("http://localhost:5000/api/societies/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg == "success") {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(data.token);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  console.log(isLoggedIn);
  if (isLoggedIn) return <Redirect to="/socadddata" />;
  else {
    return (
      <div style={style}>
        <h2>SIGN IN</h2>
        <div style={{ margin: "auto" }}>
          <LockOutlinedIcon />
        </div>
        <form style={style} onSubmit={Submit}>
          <input
            name="email"
            type="email"
            placeholder="email"
            style={{ marginTop: "5px" }}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            style={{ marginTop: "5px" }}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button style={{ marginTop: "5px" }}>Login</button>
        </form>
        <div style={{ style }}>
          <h2>Wanna contribute being as a society! Register here</h2>
          <Link to="/socsignup" style={{ textDecoration: "none" }}>
            <Button color="inherit">Register</Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default SocLogin;
