import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCn3MoNd89V4l4_D2g8mvg4JQjavbUArcA",
    authDomain: "nextstop-57593.firebaseapp.com",
    databaseURL: "https://nextstop-57593-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nextstop-57593",
    storageBucket: "nextstop-57593.appspot.com",
    messagingSenderId: "836771449749",
    appId: "1:836771449749:web:824c1894117d17c54bc49c",
    measurementId: "G-CPVYBN7CEE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = firebase.database()

export {
    db
}