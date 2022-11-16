import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFJ3pcGNBOVEfJLivmXQpLvDDsVgieys4",
  authDomain: "books-and-notes-app.firebaseapp.com",
  projectId: "books-and-notes-app",
  storageBucket: "books-and-notes-app.appspot.com",
  messagingSenderId: "11035535129",
  appId: "1:11035535129:web:9192cd6096b9ef84a50788",
};

export const app = initializeApp(firebaseConfig);
