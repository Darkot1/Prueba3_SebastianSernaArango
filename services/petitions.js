import { URLReservations, URLUsers, URLfFights } from "./route.js";



/*--------------------REGISTRAR USUARIOS---------------------------- */
export async function addUsers(inputName,inputEmail,inputDob,inputPassword) {
  const response = await fetch(URLUsers + `?email=${email.value}`);
  const data = await response.json();
  if (!data.length) {
    await fetch(URLUsers, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name: inputName,
        email: inputEmail,
        dob: inputDob,
        password: inputPassword,
        role: "visitor",
      }),
    });

    window.location.href = "/views/login.html";
  } else {
    alert("usuario ya registrado");
  }
}



/*-------------------------VERIFICAR SI EL CORREO YA EXISTE EN EL LOGIN-------------- */
export async function singUser(inputEmail, inputPassword) {
  const response = await fetch(URLUsers + `?email=${inputEmail}`);
  const data = await response.json();

  //si la respuesta tiene informacion guarde los datos y los compare
  if (data.length) {
    if (data[0].password === inputPassword) {
      //se guarda el objeto en el localstorage
      localStorage.setItem("UserLogin", JSON.stringify(data[0].role));
      window.location.href = "/index.html";
    } else {
      alert("contraseña incorrecta");
    }
    //si la respuesta no tiene informacion significa que no hay datos del usuario
  } else {
    alert("El correo no esta registrado");
  }
}


/*-------------------------VERIFICAR SI HAY UN LOGIN EN LA PAGINA-------------- */

const btnAdmin = document.querySelector(".admin");


export async function login() {
    const user = localStorage.getItem("UserLogin")
    
    if(user == "admin"){
        btnAdmin.classList.toggle("admin")
        window.location.href = "/index.html";
    }
    else if(user == "visitor"){
        window.location.href = "/index.html";
    }else if(!user){
        window.location.href = "/views/login.html"
    }
}


/*------------------------CERRAR SESION------------------------------------ */

export function logout() {
    localStorage.removeItem("UserLogin");
}



/*---------------INFO DEL VUELO-------------------------------- */

export async function Infoflight(params) {
  const btnReservation = document.querySelectorAll(".btn-primary");
  const containerModal = document.querySelector(".modal");

  const responseJson = await fetch(URLfFights);
  const flightsData = await responseJson.json();
  

  btnReservation.forEach((button, i) => {
    button.addEventListener("click", () => {
      const flight = flightsData[i]; // Obtener el vuelo correspondiente al índice del botón clicado

      // Actualizar el contenido del modal con la información del vuelo
      containerModal.innerHTML = `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Flight Information</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="Infoflight">
                  <p>id vuelo: ${flight.flightNumber}</p>
                  <p>ciudad origen: ${flight.origin}</p>
                  <p>ciudad destino: ${flight.destination}</p>
                  <p>disponibles: ${flight.capacity}</p>
                  <p>reservas: ${flight.reservedSeats}</p>
                  <img src="${flight.image}" class="card-img-top" alt="...">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });


}


/*-------------------RESERVACIONES------------------------------- */
const btnR = document.querySelectorAll(".btn-success");
const containerMR = document.querySelector(".modal_Reservation");

export async function reservation(params) {
  btnR.forEach((button) => {
    button.addEventListener("click", () => {
      containerMR.innerHTML += `
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Reservacion</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="seating">Cuantos asientos desea: </label>
                            <input type="number" id="seating">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button id="resertBtn" type="button" class="btn btn-primary">Reservar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
      
      // Seleccionar el botón "Reservar" dentro del modal
      const resertBtn = document.getElementById("resertBtn");
      const seating = document.getElementById("seating");
      // Agregar evento de clic al boton "Reservar"
     resertBtn.addEventListener("click", async () => {
       
        
        
       // Si seating tiene un valor, continuar con el proceso de reserva
       async function reser(seating) {
         // enviar la info

         const newData = {
           seatings: seating.value,
           
         };
         // enviar la info capturada
         await fetch(URLReservations, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(newData),
         });
       }

       reser(seating);
     });

    });
  });
}