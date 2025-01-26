const container = document.querySelector('.container');

document.querySelectorAll('.login_btn, .sign_btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        container.classList.toggle('active', btn.classList.contains('login_btn'));
    });
});

const reg_email = document.querySelector(".reg_email");
const reg_password = document.querySelector(".reg_password");
const reg_from = document.querySelector(".reg_from");
const login_email = document.querySelector(".login_email");
const login_password = document.querySelector(".login_password");
const login_form = document.querySelector(".login_form");
const google_Btn = document.querySelector(".google_Btn");


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

reg_from.addEventListener('submit', function (event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, reg_email.value, reg_password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });

    reg_email.value = "";
    reg_password.value = "";

    setTimeout(() => {
        container.classList.remove('active');
    }, 1000);
});


login_form.addEventListener("submit", function (event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location = "index.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});

const provider = new GoogleAuthProvider();

google_Btn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location = "index.html";
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});
