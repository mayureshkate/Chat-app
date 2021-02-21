import React from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import * as actionTypes from "../store/action";
import { db } from "../firebase";

import { Avatar } from "@material-ui/core";
import { Component } from "react";

class Sidebar extends Component {
  state = {
    sidebarRows: [],
  };
  render() {
    db.collection("friends")
      .doc(this.props.uid)
      .onSnapshot((snap) => {
        let sidebarRows = [];
        snap.data().friends.map((item, i) => {
          sidebarRows.push(
            <div
              className="sidebar_row"
              key={i}
              onClick={() => {
                this.props.setFriendData(item.user, item.userPhoto, item.uid);
                this.props.openChat(snap.data().chatRooms, item.uid);
              }}
            >
              <Avatar src={item.userPhoto} /> <p>{item.user}</p>
            </div>
          );
        });
        if (sidebarRows.length !== this.state.sidebarRows.length)
          this.setState({ sidebarRows });
      });

    return (
      <div className="sidebar">
        <div className="sidebar_header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={this.props.userPhoto} />
            <h4>Hi {this.props.user}</h4>
          </div>
          <div>
            <p onClick={this.props.openFriend}>Add Friend?</p>
          </div>
        </div>
        <hr />
        <div className="sidebar_body">{this.state.sidebarRows}</div>
      </div>
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
    setFriendData: (name, photo, id) =>
      dispatch({
        type: actionTypes.SET_DATA,
        fname: name,
        fphoto: photo,
        fid: id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
