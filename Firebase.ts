// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { FIREBASE_API_KEY } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'ecommercern-c2f38.firebaseapp.com',
  projectId: 'ecommercern-c2f38',
  storageBucket: 'ecommercern-c2f38.appspot.com',
  messagingSenderId: '57340341542',
  appId: '1:57340341542:web:971ae8ec6af148fb83e5e7',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
