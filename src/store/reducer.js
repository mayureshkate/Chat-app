import * as actionTypes from "./action";
const initialState = {
  user: "Aashu",
  userPhoto:
    "https://cdn.pixabay.com/photo/2015/09/18/00/24/robin-944887__340.jpg",
  uid: "3vqlti21UNYyDozEAnre",
  friend: "",
  friendPhoto: "",
  fid: "",
  chatRoom: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      let myState = { ...state };
      myState.user = action.name;
      myState.userPhoto = action.photo;
      myState.uid = action.uid;
      return myState;
    }
    case actionTypes.SET_DATA: {
      let myState = { ...state };
      myState.friend = action.fname.includes(" ", 0)
        ? action.fname.substr(0, action.fname.indexOf(" "))
        : action.fname;
      myState.friendPhoto = action.fphoto;
      myState.fid = action.fid;
      return myState;
    }
    case actionTypes.CHAT_ROOM: {
      let myState = { ...state };
      myState.chatRoom = action.room;
      return myState;
    }
    default:
      return state;
  }
};
export default reducer;
