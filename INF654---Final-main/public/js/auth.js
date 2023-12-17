import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNjErfi5ptobxbtAzuWIT_eqDkPg9Dlc8",
  authDomain: "dndcharacter-1d861.firebaseapp.com",
  projectId: "dndcharacter-1d861",
  storageBucket: "dndcharacter-1d861.appspot.com",
  messagingSenderId: "353429931818",
  appId: "1:353429931818:web:b94e40c6b2a779646cc053",
  measurementId: "G-VK3QR064W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
    //signed in
    const user = userCredentials.user;
    console.log(user);
    const modal = document.querySelector("#modal-signup");
    console.log(modal);
    M.Modal.getInstance(modal).close();
    signupForm.reset();
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
        console.log("User has signed out")
    }).catch((error) => {
        //An error happened
        console.log(error);
    });
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        //signed in
        const user = userCredentials.user;
        console.log(user);
        const modal = document.querySelector("#modal-login");
        console.log(modal);
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
    });
});