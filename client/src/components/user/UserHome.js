import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Template from "./SocietyTemplate";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [sub, setSub] = useState([]);
  const [extra, setExtra] = useState();
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
        console.log(data);
        //if(data.ms)
        //Got the subscribed societies
        let subscribedSocities = data.data.map(async x => {
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
              console.log(data);
              temp = {
                name: x,
                notifs: data.data.notifs
              };
              //console.log(temp);
            });
          return temp;
        });

        setSub(subscribedSocities);
        //console.log(subscribedSocities);
        // subscribedSocities[0].then(data => console.log(data));
      });
  }, []);
  if (!token) return <Redirect to="/userlogin" />;
  return (
    <div>
      <div>
        <h1>Welcome here are your subscriptions</h1>
        <div>
          {sub.map(async x => {
            let dat = await x.then(data => {
              //return <Template name={data.name} notifs={data.notifs} />;
              return data;
            });
            console.log("data", dat);
          })
          /* sub.map(x => {
            return <Template name="sid" notifs={["cedce", "ecedc"]} />;
          })*/
          }
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
