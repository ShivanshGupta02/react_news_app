import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDj_UwOPi_UYuZ_jmgLQPp4TyJ58xTBFw",
  authDomain: "news-app-64f70.firebaseapp.com",
  projectId: "news-app-64f70",
  storageBucket: "news-app-64f70.appspot.com",
  messagingSenderId: "299517470156",
  appId: "1:299517470156:web:94550281d864a80e6ea969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)


