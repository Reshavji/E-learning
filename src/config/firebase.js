import firebase from 'firebase';

const firebaseConfig = {
  // Your Config Goes Here
  apiKey: "AIzaSyB6Ru6pTUWjIhDKY7IstP_T3k9YbNekiEw",
  authDomain: "learning-845f3.firebaseapp.com",
  databaseURL: "https://learning-845f3-default-rtdb.firebaseio.com",
  projectId: "learning-845f3",
  storageBucket: "learning-845f3.appspot.com",
  messagingSenderId: "853941987158",
  appId: "1:853941987158:web:07e44b3dd2bc0aaebe18f7"
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };
