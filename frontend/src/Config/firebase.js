// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTtd-9wgqVBRHse9fhYCMBslFpJCI1pfM",
  authDomain: "my-portfolio-375111.firebaseapp.com",
  projectId: "my-portfolio-375111",
  storageBucket: "my-portfolio-375111.appspot.com",
  messagingSenderId: "670672076562",
  appId: "1:670672076562:web:428f1b42f99de1225d3dcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provide = new GoogleAuthProvider();