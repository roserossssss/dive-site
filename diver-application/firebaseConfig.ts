import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuVck9pOuggl5KsA-xNFVWNsEVd7y17pI",
  authDomain: "master-liveaboards-webapp.firebaseapp.com",
  projectId: "master-liveaboards-webapp",
  storageBucket: "master-liveaboards-webapp.firebasestorage.app",
  messagingSenderId: "775529045795",
  appId: "1:775529045795:web:0ff0b981cc7f5e90207696"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);