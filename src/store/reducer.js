import * as actionTypes from "./action";
const initialState = {
  user: null,
  userPhoto: "",
  uid: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      let myState = { ...initialState };
      myState.user = action.name;
      myState.userPhoto = action.photo;
      myState.uid = action.uid;
      return myState;
    }
    default:
      return state;
  }
};
export default reducer;
