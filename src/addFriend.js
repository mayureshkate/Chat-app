import { db } from "./firebase";
import firebase from "firebase";
const makeThemFriends = (friend, friendPhoto, fid, user, userPhoto, uid) => {
  if (uid == fid) return;
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
  // making reques to get the data of friend
  db.collection("friends")
    .doc(uid)
    .get()
    .then((res) => {
      res.data().friends.map((item) => {
        if (item.uid == fid) alreadyFriends = true;
      });

      // if they are not already friends (user and his friend)

      if (!alreadyFriends) {
        db.collection("chatRooms")
          .orderBy("index", "desc")
          .limit(1)
          .get()
          .then((res) => {
            let chIndex = res.docs[0].data().index + 1;
            chatRoom = `ch${chIndex}`;
            // setting chat-room for them
            db.collection("chatRooms").doc(chatRoom).set({
              index: chIndex,
              messages: [],
            });
            // making them friends
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
  // making request to check if the friend even exist on the database or not

  db.collection("friends")
    .doc(fid)
    .get()
    .then((res) => {
      if (res.exists) {
        let friend = res.data().info.user;
        let friendPhoto = res.data().info.userPhoto;

        makeThemFriends(friend, friendPhoto, fid, user, userPhoto, uid);
      } else {
        alert(`Invalid Friend id : [${fid}]`);
      }
    })
    .catch((err) => {
      alert("Error in addinig Friend :", err.message);
    });
};

export default addFriend;
