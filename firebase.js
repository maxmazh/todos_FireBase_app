// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhxx1VCfEVkVCDbHrPq4C4L0Ew_fF9VTA",
  authDomain: "todo-8bfd2.firebaseapp.com",
  projectId: "todo-8bfd2",
  storageBucket: "todo-8bfd2.firebasestorage.app",
  messagingSenderId: "677722116106",
  appId: "1:677722116106:web:0eb31d1c94728fa75dcff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      title: "Задача 3",
      status: "active",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error addind document: ", e);
  }
}

async function getData() {
  const querySnapshot = await getDocs(collection(db, "Todos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().title}`);
  });
}

addData();
getData();
// console.log(app);