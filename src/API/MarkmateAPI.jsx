import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBazGGW-p7vaAPHt1yIXBG2WB_EtlfVB-8",
    authDomain: "markmate-finder.firebaseapp.com",
    projectId: "markmate-finder",
    storageBucket: "markmate-finder.firebasestorage.app",
    messagingSenderId: "776650540132",
    appId: "1:776650540132:web:05d7b841060b085ea34b71",
    measurementId: "G-GSWJX7P41J"
}; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };