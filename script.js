const container = document.querySelector('.container');

document.querySelectorAll('.login_btn, .sign_btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        container.classList.toggle('active', btn.classList.contains('login_btn'));
    });
});


const reg_username = document.querySelector(".reg_username");
const reg_email = document.querySelector(".reg_email");
const reg_password = document.querySelector(".reg_password");
const reg_from = document.querySelector(".reg_from");


import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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