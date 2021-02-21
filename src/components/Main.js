import React from "react";
import "./Main.css";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

import { db } from "../firebase";
import { connect } from "react-redux";
import * as actionTypes from "../store/action";
import { Component } from "react";

class Main extends Component {
  render() {
    const openChat = (myRooms, friendId) => {
      let friendRooms;
      db.collection("friends")
        .doc(friendId)
        .get()
        .then((doc) => {
          let data = doc.data();
          friendRooms = data.chatRooms;

          myRooms.some((e) => {
            if (friendRooms.includes(e)) {
              this.props.setChatRoom(e);
              return true;
            }
          });
        });
    };
    return this.props.user ? (
      <div className="main">
        <Sidebar openChat={openChat} />
        <ChatBox />
      </div>
    ) : (
      <h1>Please signin first.</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChatRoom: (room) =>
      dispatch({ type: actionTypes.CHAT_ROOM, room: room }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
