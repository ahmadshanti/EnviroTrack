import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD92_ugpfwN2GQ8vzSX5Xc1pX3eX3Hdut4",
  authDomain: "environmental-tracker-19fcc.firebaseapp.com",
  databaseURL: "https://environmental-tracker-19fcc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "environmental-tracker-19fcc",
  storageBucket: "environmental-tracker-19fcc.firebasestorage.app",
  messagingSenderId: "963417882084",
  appId: "1:963417882084:web:fb4dc94fa35fa63dd39bf1",
  measurementId: "G-61HQ4T930Q"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);