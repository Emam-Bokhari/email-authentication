// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk5jF4rJGVjFlpQegQ33Gl7kS87AjiGzo",
  authDomain: "email-authentication-e3be4.firebaseapp.com",
  projectId: "email-authentication-e3be4",
  storageBucket: "email-authentication-e3be4.appspot.com",
  messagingSenderId: "915153280732",
  appId: "1:915153280732:web:cfb89eaa31dfcc55825e19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app