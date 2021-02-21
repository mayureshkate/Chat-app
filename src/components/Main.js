import React from "react";
import "./Main.css";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

import { db } from "../firebase";
import { connect } from "react-redux";
import * as actionTypes from "../store/action";
import { Component } from "react";
import addFriendToDB from "../addFriend";

class Main extends Component {
  friendBox;
  inputFid;
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
    const addFriend = () => {
      let searchId = this.inputFid.value;
      addFriendToDB(
        searchId,
        this.props.user,
        this.props.userPhoto,
        this.props.uid
      );
      toggleFriendBox();
    };
    const toggleFriendBox = () => {
      this.friendBox.classList.toggle("main_add-friend-close");
    };
    return this.props.user ? (
      <div className="main">
        <Sidebar openFriend={toggleFriendBox} openChat={openChat} />
        <ChatBox />
        <div
          ref={(el) => (this.friendBox = el)}
          className="main_add-friend main_add-friend-close"
        >
          <label>Enter Friend's ID</label>
          <input
            ref={(el) => (this.inputFid = el)}
            type="text"
            placeholder="Friend's ID"
          />
          <button onClick={toggleFriendBox} className="main_close">
            Close
          </button>
          <button onClick={addFriend} className="main_add">
            Add
          </button>
          <h1>OR</h1>
          <p>
            Ask your friend to visit this link :{" "}
            <a
              target="_blank"
              href={`${window.location.origin}/signin?${this.props.uid}`}
            >
              {window.location.origin}/signin/{this.props.uid}
            </a>
          </p>
        </div>
      </div>
    ) : (
      <h1>Please signin first.</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userPhoto: state.userPhoto,
    uid: state.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChatRoom: (room) =>
      dispatch({ type: actionTypes.CHAT_ROOM, room: room }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
