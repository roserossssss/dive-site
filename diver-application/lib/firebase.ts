// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";

// Add any Firebase services you use:
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuVck9pOuggl5KsA-xNFVWNsEVd7y17pI",
  authDomain: "master-liveaboards-webapp.firebaseapp.com",
  projectId: "master-liveaboards-webapp",
  storageBucket: "master-liveaboards-webapp.appspot.com", // (fix: you had .app not .com)
  messagingSenderId: "775529045795",
  appId: "1:775529045795:web:0ff0b981cc7f5e90207696"
};

// Prevent reinitializing Firebase on hot reloads in dev
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
