import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIheFA9pjV634YCVezKxgEIug4rlNS70g",
  authDomain: "offscript-8f6eb.firebaseapp.com",
  projectId: "offscript-8f6eb",
  storageBucket: "offscript-8f6eb.firebasestorage.app",
  messagingSenderId: "239069442731",
  appId: "1:239069442731:web:b5eac19f0f81d6ef2c3dee",
  measurementId: "G-9GL059BLSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider, analytics };
