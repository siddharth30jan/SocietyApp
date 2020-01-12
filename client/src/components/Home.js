import React from "react";
import Nav from "./Nav";
const style = {
  background: "lightblue",
  padding: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%"
};

const Home = () => {
  return (
    <div>
    <Nav />
      <div style={style}>
        <h1>Come join us!!</h1>
        <p>Know whats going on around</p>
      </div>
    </div>
  );
};

export default Home;
