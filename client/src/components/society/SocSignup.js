import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "50px"
};
const SocSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Submit = e => {
    e.preventDefault();
    console.log(name, password, email);
    fetch("http://localhost:5000/api/societies/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg == "success") {
          setIsLoggedIn(true);
        }
      })
      .catch(e => console.log(e));
  };

  if (isLoggedIn) {
    return <Redirect to="/soclogin" />;
  } else {
    return (
      <div style={style}>
        <h2>SIGNUP</h2>
        <div style={{ margin: "auto" }}>
          <LockOutlinedIcon />
        </div>
        <form style={style} onSubmit={Submit}>
          <input
            name="name"
            type="text"
            placeholder="name"
            style={{ marginTop: "5px" }}
            onChange={e => {
              setName(e.target.value);
            }}
          />
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
          <button style={{ marginTop: "5px" }}>Register</button>
        </form>
      </div>
    );
  }
};

export default SocSignup;
