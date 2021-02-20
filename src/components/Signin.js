import React from "react";
import logo from "../assets/Saly-12.svg";
import "./Signin.css";

import * as actionTypes from "../store/action";
import { connect } from "react-redux";
import { auth, authProvider } from "../firebase";

function Signin(props) {
  const singIn = () => {
    auth
      .signInWithPopup(authProvider)
      .then((result) => {
        let name = result.user.displayName;
        let photo = result.user.photoURL;
        let id = result.user.uid;
        props.login(name, photo, id);
        props.history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signin">
      <div className="signin_header">
        <img src={logo} alt="LOGO" />
        <h1>Chat App</h1>
      </div>

      <button type="submit" onClick={singIn}>
        Sign in
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapActionToProps = (dispatch) => {
  return {
    login: (name, photo, uid) =>
      dispatch({ type: actionTypes.LOGIN, name: name, photo: photo, uid: uid }),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Signin);
