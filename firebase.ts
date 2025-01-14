import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4-uWGDPuhS-0QXYu-fnNngak1xOIxQmQ",
  authDomain: "ipsum-74daa.firebaseapp.com",
  projectId: "ipsum-74daa",
  storageBucket: "ipsum-74daa.firebasestorage.app",
  messagingSenderId: "577136185682",
  appId: "1:577136185682:web:de502885cf7a24a2956a8b",
  measurementId: "G-5DLXJ6P63X"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
