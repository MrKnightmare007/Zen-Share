// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-KcOwSMWr5XqQOKU7Z6tl-X7ZkDBKS1M",
  authDomain: "zenshare-36b1b.firebaseapp.com",
  projectId: "zenshare-36b1b",
  storageBucket: "zenshare-36b1b.appspot.com",
  messagingSenderId: "884904275321",
  appId: "1:884904275321:web:fab9093b7731b2da3893a8",
  measurementId: "G-TLLC10HG0R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);