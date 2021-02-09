import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDKQpA5SSFTGgbvN84XziU9xwVb5Nh9qME",
    authDomain: "foodadvisor-d743f.firebaseapp.com",
    projectId: "foodadvisor-d743f",
    storageBucket: "foodadvisor-d743f.appspot.com",
    messagingSenderId: "290779273232",
    appId: "1:290779273232:web:fbf9b99593e49a358ed295"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
export { db, firebase }
