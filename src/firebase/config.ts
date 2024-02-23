import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

// Initialize Firebase Analytics asynchronously if supported
let analytics;
const initAnalytics = async () => {
  const analyticsSupported = await isSupported();
  if (analyticsSupported) {
    analytics = getAnalytics(firebaseApp);
  }
};

if (typeof window !== 'undefined') {
  initAnalytics().catch(error => {
    console.error("An error occurred while initializing Firebase Analytics:", error);
  });
}

export { firebaseApp, auth, analytics };