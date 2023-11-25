
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCAcHntKYwNdId3LNrGdppcFRNDBhk_BNQ",
  authDomain: "uploadfile-9c829.firebaseapp.com",
  projectId: "uploadfile-9c829",
  storageBucket: "uploadfile-9c829.appspot.com",
  messagingSenderId: "456627444087",
  appId: "1:456627444087:web:1ed7acd67960b8c869e972"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)