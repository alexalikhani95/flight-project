// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCy9eI3cXmEiRNHe1Fena90q2VksqFMCwU',
  authDomain: 'flight-app-6a4f2.firebaseapp.com',
  projectId: 'flight-app-6a4f2',
  storageBucket: 'flight-app-6a4f2.appspot.com',
  messagingSenderId: '84074752345',
  appId: '1:84074752345:web:6fccf7be9fee99237b0448',
  measurementId: 'G-X88M2XE64L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
