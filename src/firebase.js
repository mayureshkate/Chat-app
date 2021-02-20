import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbmH0FJTzDxACDX50TCfXnI7mRiv2yUEw",
  authDomain: "chat111app.firebaseapp.com",
  projectId: "chat111app",
  storageBucket: "chat111app.appspot.com",
  messagingSenderId: "708511866243",
  appId: "1:708511866243:web:601d590cbff085d99deab6",
  measurementId: "G-SMBCCMD7W5",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const authProvider = new firebase.auth.GoogleAuthProvider();
