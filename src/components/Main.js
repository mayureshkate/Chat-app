import React from "react";
import "./Main.css";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

function Main() {
  return (
    <div className="main">
      <Sidebar />
      <ChatBox />
    </div>
  );
}

export default Main;
