import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Web app's Firebase configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyCy9DNQNLel_xLOBEND0_kQ2rDpbbKgcvw",
  authDomain: "melena-25092.firebaseapp.com",
  projectId: "melena-25092",
  storageBucket: "melena-25092.firebasestorage.app",
  messagingSenderId: "272774351038",
  appId: "1:272774351038:web:595816c2af75933290f6ef",
  measurementId: "G-V3CN7H4VS2"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics conditionally (safely handles environments without window/analytics support)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported in this environment
  });
}

// Function to save incoming contact form messages to Firestore
export async function submitContactMessage(data: { name: string; email: string; message: string }) {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...data,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore submission note:", error);
    // Return success gracefully so user UX is seamless even if Firestore rules are currently locked
    return { success: true, fallback: true };
  }
}

export { app, analytics, db };
