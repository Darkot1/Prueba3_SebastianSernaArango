import { addUsers } from "./petitions.js";

/*-----------------SELECTORES---------------------------- */
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputDob = document.querySelector("#dob");
const inputPassword = document.querySelector("#password");
const registerForm = document.querySelector("#registerForm")


/*---------------EVENTOS----------------------------------- */
registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addUsers(inputName.value, inputEmail.value,inputDob.value,inputPassword.value);
})



