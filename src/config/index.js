import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH6gTDxg49uM4wmzP-iKbupTwXSgrV7zI",
  authDomain: "spk-atm.firebaseapp.com",
  projectId: "spk-atm",
  storageBucket: "spk-atm.appspot.com",
  messagingSenderId: "736529975282",
  appId: "1:736529975282:web:0186338addb230b6318d6b",
  measurementId: "G-VEH8FPTEMR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
