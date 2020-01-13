import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "20px"
};
const SocLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Submit = e => {
    e.preventDefault();
    console.log(password, email);
  };
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
        <h2>Dont have an account? Register here</h2>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button color="inherit">Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default SocLogin;
