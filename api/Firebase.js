const firebase = require('firebase');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ8V8LajI5MOCa79_qD0LKzVWOxaDz2U8",
  authDomain: "monthlyupdare.firebaseapp.com",
  projectId: "monthlyupdare",
  storageBucket: "monthlyupdare.appspot.com",
  messagingSenderId: "781895082131",
  appId: "1:781895082131:web:3f4b7e7c0ccf0faed6ad66",
  measurementId: "G-9JXHNJ9KZP"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
const db = firebase.firestore()

module.exports = db;
