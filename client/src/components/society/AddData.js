import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

const AddData = () => {
  const [data, setData] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  /*const f=async ()=>{
    await 
  }
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    f()
    console.log(token);
  });*/

  //
  const mounted = useRef();
  /*useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // do componentDidUpate logic
    setToken(localStorage.getItem("token"));
  }
});*/

  const submitData = e => {
    e.preventDefault();
    console.log(data);
  };

  if (!token) return <Redirect to="/soclogin" />;
  else {
    return (
      <div>
        <h1>Welcome! You can add your notifications..</h1>
        <input
          type="text"
          palceholder="Enter here.."
          onChange={e => setData(e.target.value)}
        />
        <button onClick={submitData}>Add!</button>
      </div>
    );
  }
};

export default AddData;
