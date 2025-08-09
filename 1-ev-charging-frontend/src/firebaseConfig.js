// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuRJXIv3mYSFjASsIb85LH1tIkzcwnB64",
  authDomain: "ev-charging-app-422c8.firebaseapp.com",
  projectId: "ev-charging-app-422c8",
  storageBucket: "ev-charging-app-422c8.appspot.com",
  messagingSenderId: "294968847329",
  appId: "1:294968847329:web:2e4ae4ce1b5af7413b80a0",
  measurementId: "G-6NSPRCR3ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
