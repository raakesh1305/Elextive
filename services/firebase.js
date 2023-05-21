import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    const config = {
    apiKey: "AIzaSyAgxEtojcMXM9GwZtTQKnOljEriIRKhzCQ",
    authDomain: "electivedatabase.firebaseapp.com",
    projectId: "electivedatabase",
    storageBucket: "electivedatabase.appspot.com",
    messagingSenderId: "591299039820",
    appId: "1:591299039820:web:aad0844a0683c934349ae9",
    measurementId: "G-ESLFFBQEXQ"
    }
    firebase.initializeApp(config)
    firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
const fireAuth = firebase.auth()

fireDb.enablePersistence()
  .then(() => {console.log('Persistence was set successfully!')})
  .catch(err => {
      console.log('Persistence failed with error:', err)
  });
  

export {fireDb, fireAuth}
