import { Infoflight, login, logout, reservation } from "./petitions.js";
import { URLReservations } from "./route.js";

/*-------------SELECTORES------------------------ */
const btnLogOut = document.querySelector("#logout");


/*-------------EVENTOS--------------------------------- */
//cerrar sesion
btnLogOut.addEventListener("click",()=>{
    logout();
    location.reload();
});

//reservacion






/*------------------FUNCIONES-------------- */
login();

Infoflight()

reservation()

