import React from "react";
import "./ChatBox.css";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Component } from "react";

import { db } from "../firebase";

class ChatBox extends Component {
  state = {
    bodyMessages: [],
  };
  render() {
    const sendText = (e) => {
      e.preventDefault();
    };

    db.collection("chatRooms")
      .doc(this.props.chatRoom || "bot")
      .onSnapshot((snap) => {
        let bodyMessages = [];
        let data = snap.data();
        data.messages.map((item, i) => {
          if (item.uid !== this.props.uid)
            bodyMessages.push(
              <div key={i} className="chat-box_in chat-box_body-msg">
                <p>{item.message}</p>
              </div>
            );
          else
            bodyMessages.push(
              <div key={i} className="chat-box_out chat-box_body-msg">
                <p>{item.message}</p>
              </div>
            );
        });
        if (
          bodyMessages.length !== this.state.bodyMessages.length ||
          bodyMessages[0] !== this.state.bodyMessages[0]
        )
          this.setState({ bodyMessages: bodyMessages });
      });

    return (
      <div className="chat-box">
        <div className="chat-box_header">
          <section>
            <Avatar src={this.props.friendPhoto} />
            <p>{this.props.friend}</p>
          </section>
          <section>
            <Avatar src={this.props.userPhoto} />
            <p>{this.props.user}</p>
          </section>
        </div>
        <div className="chat-box_body">{this.state.bodyMessages}</div>
        <div className="chat-box_footer">
          <form>
            <input type="text" placeholder="Type a message" />
            <button onClick={sendText} type="submit">
              ᗒ
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userPhoto: state.userPhoto,
    uid: state.uid,
    friend: state.friend,
    friendPhoto: state.friendPhoto,
    fid: state.fid,
    chatRoom: state.chatRoom,
  };
};

export default connect(mapStateToProps)(ChatBox);
