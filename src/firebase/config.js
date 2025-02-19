import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // Your Firebase config object here
  apiKey: "AIzaSyD9XCy9KQhyG0xit_htQwN5iybXcVEfgvg",
  authDomain: "fir-salon-f9f21.firebaseapp.com",
  projectId: "fir-salon-f9f21",
  storageBucket: "fir-salon-f9f21.firebasestorage.app",
  messagingSenderId: "101009877501",
  appId: "1:101009877501:web:532a9546a5c6eec8f69194",
  measurementId: "G-DZ4X0QFWWZ"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) 