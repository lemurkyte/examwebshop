import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage'



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBx4AQYtsmNEdrICJ2xA_C07gmsdycIl4A",
    authDomain: "homefragrances-6856e.firebaseapp.com",
    databaseURL: "https://homefragrances-6856e.firebaseio.com",
    projectId: "homefragrances-6856e",
    storageBucket: "homefragrances-6856e.appspot.com",
    messagingSenderId: "219577894291",
    appId: "1:219577894291:web:82c3b7262df6f1eb231466",
    measurementId: "G-5KKNDC4DVB"
  };

  // Initialize Firebase
  
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');