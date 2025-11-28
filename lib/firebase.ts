// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

let app: any = null;

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: "AIzaSyCthc8vIp8fVvb9DcMKnDZH9zyHw0xYrZY",
    authDomain: "vibely-social-media.firebaseapp.com",
    projectId: "vibely-social-media",
    storageBucket: "vibely-social-media.firebasestorage.app",
    messagingSenderId: "767842087148",
    appId: "1:767842087148:web:7d48091f75aea3276535c9",
    measurementId: "G-ENEN116W9M",
  };

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

// Function to get analytics safely
export const getFirebaseAnalytics = async () => {
  if (!app || typeof window === "undefined") return null;
  if (await isSupported().catch(() => false)) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
