// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
 measurementId: process.env.MEASUREMENTID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
