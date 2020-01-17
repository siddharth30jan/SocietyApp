import React from "react";

const Template = ({ name, notifs }) => {
  alert("dfdgh");
  return (
    <div style={{ background: "blue" }}>
      <div style={{ margin: "10px", padding: "10px" }}>
        <h3>{name}</h3>
      </div>
      <div style={{ margin: "10px", padding: "10px" }}>
        {notifs.map(x => {
          return <h4 style={{ margin: "4px" }}>x</h4>;
        })}
      </div>
    </div>
  );
};

export default Template;
