// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdjJKV3j-e25-Y5_7o6ibASDa3dH8IMaA",
  authDomain: "donor-spot-test.firebaseapp.com",
  projectId: "donor-spot-test",
  storageBucket: "donor-spot-test.appspot.com",
  messagingSenderId: "901031610433",
  appId: "1:901031610433:web:26a459c2d32298afb25ec0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
