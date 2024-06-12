import { singUser } from "./petitions.js";

/*-----------------SELECTORES---------------------------- */
const inputEmail = document.querySelector("#email1");
const inputPassword = document.querySelector("#password1");
const loginForm = document.querySelector("#loginForm");

/*---------------EVENTOS----------------------------------- */


loginForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    singUser(inputEmail.value,inputPassword.value)
    
})
