import React from "react";
import logo from "../assets/Saly-12.svg";
import "./Signin.css";

import * as actionTypes from "../store/action";
import { connect } from "react-redux";
import { auth, authProvider, db } from "../firebase";
import addFriend from "../addFriend";

function Signin(props) {
  let searchId = props.location.search.slice(1);
  console.log(searchId);
  let myButton;

  const addToDB = (name, photo, uid) => {
    const docRef = db.collection("friends").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          docRef
            .set({
              chatRooms: [],
              friends: [],
              info: {
                user: name,
                userPhoto: photo,
              },
            })
            .then(() => {
              if (searchId) addFriend(searchId, name, photo, uid);
            })
            .catch((error) => {
              alert("Error: ", error);
            });
        } else {
          if (searchId) addFriend(searchId, name, photo, uid);
        }
        props.login(name, photo, uid);
        props.history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const singIn = () => {
    myButton.innerText = "Loading ...";
    myButton.disabled = true;
    auth
      .signInWithPopup(authProvider)
      .then((result) => {
        let name = result.user.displayName;
        let photo = result.user.photoURL;
        let id = result.user.uid;
        addToDB(name, photo, id);
        myButton.innerText = "Redirecting ...";
      })
      .catch((error) => {
        alert(error.message);
        myButton.innerText = "Signin";
        myButton.disabled = false;
      });
  };

  return (
    <div className="signin">
      <div className="signin_header">
        <img src={logo} alt="LOGO" />
        <h1>Chat App</h1>
      </div>

      <button ref={(el) => (myButton = el)} type="submit" onClick={singIn}>
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
