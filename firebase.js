const admin = require("firebase-admin");

const credentials = require("./path/to/internet-shop-f21f6-firebase-adminsdk-hhpcp-a1f1e620b2");

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


module.exports = {admin, firebaseApp};

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const { initializeApp } = require('firebase-admin/app');
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBxXQSkrXcF-vU_Txo8_iu8mVBKJ1E41JY",
//     authDomain: "internet-shop-f21f6.firebaseapp.com",
//     projectId: "internet-shop-f21f6",
//     storageBucket: "internet-shop-f21f6.appspot.com",
//     messagingSenderId: "557588761776",
//     appId: "1:557588761776:web:0f421465adaec8932d3f75"
// };
//
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
//
// module.exports = firebaseApp;