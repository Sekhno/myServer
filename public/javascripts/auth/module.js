import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-register.js'

const firebaseConfig = {
    apiKey: "AIzaSyBxXQSkrXcF-vU_Txo8_iu8mVBKJ1E41JY",
    authDomain: "internet-shop-f21f6.firebaseapp.com",
    projectId: "internet-shop-f21f6",
    storageBucket: "internet-shop-f21f6.appspot.com",
    messagingSenderId: "557588761776",
    appId: "1:557588761776:web:0f421465adaec8932d3f75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(auth);