// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBONVQX3_-9-B9qQxGHUI95ZNQYnEOVUxE",
  authDomain: "mern-social-media-375fb.firebaseapp.com",
  projectId: "mern-social-media-375fb",
  storageBucket: "mern-social-media-375fb.appspot.com",
  messagingSenderId: "397886166588",
  appId: "1:397886166588:web:c4723fbc45ed394585d539",
  measurementId: "G-73GH7P34K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);