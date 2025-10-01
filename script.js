//Elementos del DOM
const numeroInput = document.getElementById("numero-input");
const btnAdivinar = document.getElementById("btn-adivinar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const mensaje = document.getElementById("mensaje");
const intentosRestantesEl = document.getElementById("intentos-restantes");
const intentosUsadosEl = document.getElementById("intentos-usados");
const historialLista = document.getElementById("historial-lista");

//Estado inicial del Juego
let juegoActivo = {
  numeroSecreto: 0,
  intentosMaximos: 10,
  intentosUsados: 0,
  activo: false,
  historialNumeros: [],
};

//Funciones de actualizacion del DOM
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje activo ${tipo}`;
}
function ocultarMensaje() {
  mensaje.className = "mensaje";
}

function actualizarContador() {
  let restantes = juegoActivo.intentosMaximos - juegoActivo.intentosUsados;
  intentosRestantesEl.textContent = restantes;
  intentosUsadosEl.textContent = juegoActivo.intentosUsados;
}

function agregarNumeroAlHistorial(numero) {
  const elementoNuevo = document.createElement("div");
  elementoNuevo.textContent = numero;
  elementoNuevo.className = "historial-item";
  historialLista.appendChild(elementoNuevo);
}

function limpiarHistorial() {
  historialLista.innerHTML = "";
}

function terminarJuego() {
  juegoActivo.activo = false;
  btnAdivinar.disabled = true;
  numeroInput.disabled = true;
  btnReiniciar.classList.remove("hidden");
}
//Logica Principal
function iniciarJuego() {}
function procesarIntento() {
  console.log("se clickeo");
}

btnAdivinar.addEventListener("click", procesarIntento);
btnReiniciar.addEventListener("click", iniciarJuego);
numeroInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && juegoActivo.activo) {
    procesarIntento();
  }
});
iniciarJuego()
// function generarNumero(min, max) {
//   let nuevoNumero = Math.floor(Math.random() * (max - min + 1)) + min;
//   return nuevoNumero;
// }

// function pedirNumero(intentosRestantes) {
//   let numero = prompt(
//     `Adivina el numero (entre 1 y 100): ${intentosRestantes} intentos Restantes`
//   );
//   if (numero === null || numero === undefined || numero === "") {
//     alert("Debes ingresar un Numero del 1 al 100");
//     return pedirNumero(intentosRestantes);
//   }
//   const n = Number(numero);
//   if (Number.isNaN(n) || !Number.isInteger(n)) {
//     alert("Ingresa un Numero Valido");
//     return pedirNumero(intentosRestantes);
//   }
//   return n;
// }

// function calcularMejorIntento(listadoDeNumeros, numeroSecreto) {
//   let mejorNumero = 1000;
//   let mejorDiferencia = 1000;
//   for (let i = 0; i <= 4; i++) {
//     let numeroAChequear = listadoDeNumeros[i];
//     let diferenciaAChequear = Math.abs(numeroAChequear - numeroSecreto);
//     if (diferenciaAChequear < mejorDiferencia) {
//       mejorDiferencia = diferenciaAChequear;
//       mejorNumero = numeroAChequear;
//     }
//   }
//   return mejorNumero;
// }

// function comenzarJuego() {
//   const numeroSecreto = generarNumero(1, 100);
//   // console.log(numeroSecreto);
//   const intentosMaximos = 10;
//   let intentosUsados = 0;
//   let adivinado = false;
//   let listadoDeNumeros = [];

//   do {
//     let numeroIngresado = pedirNumero(intentosMaximos - intentosUsados);
//     listadoDeNumeros.push(numeroIngresado);
//     console.log(numeroIngresado);
//     intentosUsados++;

//     if (numeroIngresado === numeroSecreto) {
//       adivinado = true;
//     } else if (numeroIngresado < numeroSecreto) {
//       alert("El número ingresado es **menor** que el número secreto.");
//     } else {
//       alert("El número ingresado es **mayor** que el número secreto.");
//     }

//     let verificarNumero = numeroIngresado === numeroSecreto;
//     console.log(verificarNumero);
//     adivinado = verificarNumero;
//   } while (!adivinado && intentosUsados < intentosMaximos);
//   console.log(intentosUsados);
//   console.log(adivinado);

//   if (adivinado === true) {
//     alert(
//       `🎉 Ganaste: El numero ingresado es el Correcto, utilizaste ${intentosUsados} intentos`
//     );
//   } else {
//     let mejorIntento = calcularMejorIntento(listadoDeNumeros, numeroSecreto);

//     alert(
//       `❌ Perdiste: Nunca acertaste el Numero, el numero era ${numeroSecreto} tu mejor intento fue el ${mejorIntento}`
//     );
//   }

//   //   let numeroIngresado = pedirNumero();
//   //   console.log(numeroIngresado);
// }

// comenzarJuego();
