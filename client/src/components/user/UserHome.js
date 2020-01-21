import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Template from "./SocietyTemplate";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [sub, setSub] = useState([]);
  const [sub1, setSub1] = useState([]);
  const [sub2, setSub2] = useState([]);

  useEffect(() => {
    console.log("Started");
    fetch("http://localhost:5000/api/students/sub", {
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `xyz ${token}`
      })
    })
      .then(res => res.json())
      .then(data => {
        //Got the subscribed societies
        setSub(data.data);
      });
  }, []);

  useEffect(() => {
    console.log(sub);
    let subscribedSocities = sub.map(async x => {
      //Get data of respective societies
      let temp;
      await fetch(`http://localhost:5000/api/societies/${x}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          authorization: `xyz ${token}`
        })
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          temp = {
            name: x,
            notifs: data.data.notifs
          };
          //console.log('yhan',temp);
        });

      return temp;
    });

    setSub1(subscribedSocities);
    //console.log(subscribedSocities);
    // subscribedSocities[0].then(data => console.log(data));
  }, [sub]);

  useEffect(() => {
    console.log(sub1);
    Promise.all([...sub1]).then(d => {
      console.log(d);
      setSub2(d);
    });
  }, [sub1]);

  console.log(sub2);
  if (!token) return <Redirect to="/userlogin" />;
  return (
    <div>
      <div>
        <h1>Welcome here are your subscriptions</h1>
        <div>
          {sub2.map(data => {
            return <Template name={data.name} notifs={data.notifs} />;
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
