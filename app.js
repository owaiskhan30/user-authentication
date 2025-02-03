import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

// === User State Check ===
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.uid);
    } else {
        window.location = "login.html";
    }
});

// === Logout Functionality ===
const logout_btn = document.querySelector(".logout_btn");
logout_btn.addEventListener("click", function () {
    signOut(auth)
        .then(() => (window.location = "login.html"))
        .catch((error) => console.log(error.message));
});

// === Firestore: Add Todo ===
const form = document.querySelector("#form");
const todo_title = document.querySelector(".todo_title");
const todo_description = document.querySelector(".todo_description");
const sub_btn = document.querySelector(".sub_btn");
const todosRender = document.querySelector(".todosRender");
const todoArr = [];

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(todo_title.value, todo_description.value);

    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: todo_title.value,
            description: todo_description.value,
        });
        console.log("Document written with ID: ", docRef.id);
        todoArr.unshift({
            title: todo_title.value,
            description: todo_description.value,
            id: docRef.id
        });
        todo_title.value = "";
        todo_description.value = "";
        render(todoArr);
    } catch (error) {
        console.log(error.message);
    }
});

// === Firestore: Fetch Todos & Render ===
const getTodos = async () => {
    // Preloader
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
        </svg>
    `;
    todosRender.appendChild(svgContainer);

    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
            todoArr.push({ ...doc.data(), id: doc.id });
        });
        svgContainer.innerHTML = "";
        render(todoArr);
    } catch (error) {
        console.log(error.message);
    }
};
getTodos();

// === Render Todos ===
function render(renderArr) {
    todosRender.innerHTML = "";
    renderArr.map((item) => {
        todosRender.innerHTML += `
            <div class="todoBox">
                <div class="todoCtn">
                    <h1>${item.title}</h1>
                    <p>${item.description}</p>
                </div>
                <div class="todoBtn">
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            </div>
        `;
    });

    const editBtns = document.querySelectorAll(".editBtn");
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    attachEventListeners(editBtns, deleteBtn);
}

// === Attach Edit Button Event Listeners ===
function attachEventListeners(edit_todo, delete_todo) {
    edit_todo.forEach((item, index) => {
        item.addEventListener("click", async () => {
            console.log("Edit clicked for index:", index);
            todo_title.value = todoArr[index].title;
            todo_description.value = todoArr[index].description;
            sub_btn.classList.add("disable");

            // Pehle se koi update button hai toh hata do
            let existingUpdateBtn = document.querySelector(".update_btn");
            if (existingUpdateBtn) {
                existingUpdateBtn.remove();
            }

            // Naya update button create karo
            let updateBtn = document.createElement("button");
            updateBtn.className = "update_btn";
            updateBtn.textContent = "Update Todos";
            form.append(updateBtn);

            updateBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                console.log("Update button clicked");

                const todoRef = doc(db, "todos", todoArr[index].id);

                try {
                    await updateDoc(todoRef, {
                        title: todo_title.value,
                        description: todo_description.value
                    });

                    console.log("Todo updated successfully!");
                    todoArr[index].title = todo_title.value
                    todoArr[index].description = todo_description.value;
                    render(todoArr);

                    todo_title.value = "";
                    todo_description.value = "";

                    updateBtn.style.display = 'none';
                    sub_btn.classList.remove("disable");

                } catch (error) {
                    console.error("Error updating todo:", error);
                }
            });
        });
    });

    delete_todo.forEach((item, index) => {
        item.addEventListener("click", async () => {
            console.log("Delete clicked for index:", index);
            await deleteDoc(doc(db, "todos", todoArr[index].id));
            console.log('todo deleted...');
            todoArr.splice(index, 1)
            render(todoArr)
        });
    });
}


