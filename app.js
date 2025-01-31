import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const logout_btn = document.querySelector(".logout_btn");

//  User State Check

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = "login.html"
    }
});

logout_btn.addEventListener("click", function () {
    signOut(auth).then(() => {
        window.location = "login.html";
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
});

//  Render Todos Data

const todosRender = document.querySelector(".todosRender");
const render = (renderArr) => {
    renderArr.map((item) => {
        todosRender.innerHTML += `
            <div class="todoBox">
                <div class="todoCtn">
                <h1>${item.title}</h1>
                <p>${item.description}</p>
                </div>
                <div class="todoBtn">
                <button>Edit</button>
                <button>Delete</button>
                </div>
            </div>
        `;
    });
};


//  Add Data In FireBase

import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const todoArr = [];

const form = document.querySelector("#form");
const todo_title = document.querySelector(".todo_title");
const todo_description = document.querySelector(".todo_description");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(todo_title.value);
    console.log(todo_description.value);

    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: todo_title.value,
            description: todo_description.value
        });
        console.log("Document written with ID: ", docRef.id);

    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
    }
});


//  Get Data In FireBase

const getTodos = async () => {
    const svgContainer = document.createElement("div");
    svgContainer.classList.add("preloader");

    svgContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
    <path fill="none" stroke="#F8DD30" stroke-width="15" stroke-linecap="round" 
      stroke-dasharray="300 385" stroke-dashoffset="0" 
      d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
      <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2s" 
        values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
    </path>
  </svg>`;
    todosRender.appendChild(svgContainer);
    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
            todoArr.push({ ...doc.data(), id: doc.id });
        });
        svgContainer.innerHTML = "";
        render(todoArr);
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
    }
}
getTodos();