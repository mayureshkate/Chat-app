import { db } from "./firebase";
import firebase from "firebase";
const makeThemFriends = (friend, friendPhoto, fid, user, userPhoto, uid) => {
  let myInfo = {
    user: user,
    userPhoto: userPhoto,
    uid: uid,
  };
  let friendInfo = {
    user: friend,
    userPhoto: friendPhoto,
    uid: fid,
  };
  let chatRoom = "";
  let alreadyFriends = false;
  db.collection("friends")
    .doc(uid)
    .get()
    .then((res) => {
      res.data().friends.map((item) => {
        if (item.uid == fid) alreadyFriends = true;
      });
      console.log("alreadyFriends: ", alreadyFriends);
      if (!alreadyFriends) {
        db.collection("chatRooms")
          .orderBy("index", "desc")
          .limit(1)
          .get()
          .then((res) => {
            let chIndex = res.docs[0].data().index + 1;
            chatRoom = `ch${chIndex}`;
            db.collection("chatRooms").doc(chatRoom).set({
              index: chIndex,
              messages: [],
            });
            db.collection("friends")
              .doc(fid)
              .update({
                chatRooms: firebase.firestore.FieldValue.arrayUnion(chatRoom),
                friends: firebase.firestore.FieldValue.arrayUnion(myInfo),
              });
            db.collection("friends")
              .doc(uid)
              .update({
                chatRooms: firebase.firestore.FieldValue.arrayUnion(chatRoom),
                friends: firebase.firestore.FieldValue.arrayUnion(friendInfo),
              });
          })
          .catch((err) =>
            alert("Error in finding chatRoom to add Friends : ", err.message)
          );
      }
    });
};

const addFriend = (fid, user, userPhoto, uid) => {
  console.log("addFriend is called");
  db.collection("friends")
    .doc(fid)
    .get()
    .then((res) => {
      if (res.exists) {
        let friend = res.data().info.user;
        let friendPhoto = res.data().info.userPhoto;

        makeThemFriends(friend, friendPhoto, fid, user, userPhoto, uid);
      } else {
        alert(`friend id : ${fid} is invalid :(`);
      }
    })
    .catch((err) => {
      alert("Error in addinig Friend :", err.message);
    });
};

export default addFriend;
