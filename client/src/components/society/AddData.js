import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

const AddData = () => {
  const [data, setData] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [wait, setWait] = useState("");

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
    //wait
    setWait("Please wait..");
    fetch("http://localhost:5000/api/societies/add", {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `xyz ${token}`
      })
    })
      .then(res => res.json())
      .then(data => {
        setWait("");
        alert(`Succesfully added!`);
      })
      .catch(console.log);
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
        {wait}
      </div>
    );
  }
};

export default AddData;
