import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3uaQz8R68dKol90UcQf1kc193uCcKdlk",
  authDomain: "umeed-cultured-app.firebaseapp.com",
  projectId: "umeed-cultured-app",
  storageBucket: "umeed-cultured-app.appspot.com",
  messagingSenderId: "357628128886",
  appId: "1:357628128886:web:121f234fd3f3bb7b633957",
  measurementId: "G-8MFSY4DZ1K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

