import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyAFJ3pcGNBOVEfJLivmXQpLvDDsVgieys4",
  authDomain: "books-and-notes-app.firebaseapp.com",
  projectId: "books-and-notes-app",
  storageBucket: "books-and-notes-app.appspot.com",
  messagingSenderId: "11035535129",
  appId: "1:11035535129:web:9192cd6096b9ef84a50788",
};
const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseProvider = (props) => {
  const [error, setError] = useState(null);
  const [authUser, setAuthuser] = useState(null);
  // const [snapshot, setSnapshot] = useState([]);

  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  // Sign Up user
  const singUpUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e.message.slice(9, 50));
      setError(e.message.slice(9, 50));
    }
  };

  // Login User

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      //   console.log(e.message);
      setError(e.message.slice(9, 50));
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthuser(user);
      } else {
        setAuthuser(null);
      }
    });

    // console.log(snap);
  });
  const showing = authUser ? true : false;
  const logout = () => {
    // setAuthuser(null);
    signOut(auth);
  };
  // Add books to fireStore
  // storage condition :   request.time < timestamp.date(2022, 12, 13);
  const addBooks = async (name, bkno, price, bookpic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Math.floor(Math.random() * 100000)}-${bookpic.name}`
    );
    const resultImage = await uploadBytes(imageRef, bookpic);
    return await addDoc(collection(firestore, "MyBooks"), {
      name,
      bkno,
      price,
      imageURL: resultImage.ref.fullPath,
      userID: authUser.uid,
      userEmail: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
      emailVerified: authUser.emailVerified,
    });
  };
  // getData from firebase
  const readBooks = async () => {
    // const collectionRef = collection(firestore, "MyBooks");
    // const q = query(collectionRef, where("userID", "==", authUser.uid));
    //  await getDocs(collection(firestore, "MyBooks"));
    // await getDocs(q);
    return await getDocs(collection(firestore, "MyBooks"));
  };
  // Get Image source from fireStore
  const getImage = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  // Get one single data from firestore
  const getBookbyId = async (id) => {
    const ref = doc(firestore, "MyBooks", id);
    return await getDoc(ref);
  };
  // Post order to firestore
  const BookOrder = async (BookId, Quantity) => {
    const collectionRef = collection(firestore, "MyBooks", BookId, "order");
    const result = await addDoc(collectionRef, {
      userID: authUser.uid,
      userEmail: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
      emailVerified: authUser.emailVerified,
      quantity: Number(Quantity),
    });
    return result;
  };
  // Fetch the  single book on base of user from firestore

  const readOrders = async () => {
    if (!authUser) {
      return null;
    }
    const collectionRef = collection(firestore, "MyBooks");
    const q = query(collectionRef, where("userID", "==", authUser.uid));
    //  await getDocs(collection(firestore, "MyBooks"));
    return await getDocs(q);
  };

  // Get Order from firestore

  const getOrder = async (orderID) => {
    const collectionRef = collection(firestore, "MyBooks", orderID, "order");

    return await getDocs(collectionRef);
  };

  const AllContext = {
    singUpUser,
    loginUser,
    signInWithGoogle,
    logout,
    addBooks,
    readBooks,
    getImage,
    getBookbyId,
    BookOrder,
    readOrders,
    getOrder,
    error,
    authUser,
    showing,
  };

  return (
    <firebaseContext.Provider value={{ AllContext }}>
      {props.children}
    </firebaseContext.Provider>
  );
};

export default firebaseContext;
