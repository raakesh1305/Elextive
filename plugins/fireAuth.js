import {
  fireAuth, fireDb
} from '@/services/firebase.js'

export default context => {
  const {
    store
  } = context
  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        fireDb.collection("users").doc(user.email).get()
          .then(doc => {
            if (doc.exists) {
              store.commit('user/setUserData', doc.data())
              console.log("fireUser: Document data:", doc.data());
            } else {
              console.log("fireUser: No such document!", doc);
            }
          }).catch(function (error) {
            console.log("fireUser: Error getting document:", error);
          });
        return resolve(store.dispatch('user/syncUser', user))
      }
      return resolve()
    })
  })
}
