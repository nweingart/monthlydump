// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'
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
  measurementId: "G-9JXHNJ9KZP",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const usersRef = collection(db, "users")
const updatesRef = collection(db, "updates")
const mailingListsRef = collection(db, "mailingLists")
const functions = getFunctions(app)
const storage = getStorage(app)

getDocs(usersRef)
  .then((querySnapshot) => {
  let users = []
  querySnapshot.forEach((doc) => {
    users.push( { ...doc.data(), id: doc.id} )
  })
  console.log(users)
})
  .catch(err => {
  console.log(err)
  })


export { auth, db, storage, functions, usersRef, updatesRef, mailingListsRef }
