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

//Funciones de actualización del DOM
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

function terminarJuego(mensajeFinal, tipo) {
  juegoActivo.activo = false;
  btnAdivinar.disabled = true;
  numeroInput.disabled = true;
  btnReiniciar.classList.remove("hidden");
  mostrarMensaje(mensajeFinal, tipo);
}

// 🔹 Generar número aleatorio
function generarNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 🔹 Calcular el intento más cercano (cuando se pierde)
function calcularMejorIntento(listadoDeNumeros, numeroSecreto) {
  let mejorNumero = listadoDeNumeros[0];
  let mejorDiferencia = Math.abs(mejorNumero - numeroSecreto);

  for (let numero of listadoDeNumeros) {
    let diferencia = Math.abs(numero - numeroSecreto);
    if (diferencia < mejorDiferencia) {
      mejorDiferencia = diferencia;
      mejorNumero = numero;
    }
  }
  return mejorNumero;
}

// 🔹 Iniciar/Reiniciar el juego
function iniciarJuego() {
  juegoActivo.numeroSecreto = generarNumero(1, 100);
  juegoActivo.intentosUsados = 0;
  juegoActivo.activo = true;
  juegoActivo.historialNumeros = [];

  numeroInput.value = "";
  numeroInput.disabled = false;
  btnAdivinar.disabled = false;
  btnReiniciar.classList.add("hidden");

  limpiarHistorial();
  actualizarContador();
  ocultarMensaje();

  // Guardar estado inicial en localStorage
  localStorage.setItem("historialNumeros", JSON.stringify([]));
}

// 🔹 Procesar intento
function procesarIntento() {
  if (!juegoActivo.activo) return;

  const numeroIngresado = Number(numeroInput.value);

  // Validación
  if (
    isNaN(numeroIngresado) ||
    numeroIngresado < 1 ||
    numeroIngresado > 100
  ) {
    mostrarMensaje("⚠️ Ingresa un número válido entre 1 y 100.", "error");
    return;
  }

  juegoActivo.intentosUsados++;
  juegoActivo.historialNumeros.push(numeroIngresado);
  agregarNumeroAlHistorial(numeroIngresado);
  actualizarContador();

  // Guardar en localStorage
  localStorage.setItem(
    "historialNumeros",
    JSON.stringify(juegoActivo.historialNumeros)
  );

  // Verificación
  if (numeroIngresado === juegoActivo.numeroSecreto) {
    terminarJuego(
      `🎉 Ganaste! El número secreto era ${juegoActivo.numeroSecreto}. Lo lograste en ${juegoActivo.intentosUsados} intentos.`,
      "exito"
    );
  } else if (juegoActivo.intentosUsados >= juegoActivo.intentosMaximos) {
    let mejorIntento = calcularMejorIntento(
      juegoActivo.historialNumeros,
      juegoActivo.numeroSecreto
    );
    terminarJuego(
      `❌ Perdiste! El número secreto era ${juegoActivo.numeroSecreto}. Tu intento más cercano fue ${mejorIntento}.`,
      "error"
    );
  } else if (numeroIngresado < juegoActivo.numeroSecreto) {
    mostrarMensaje("🔼 El número secreto es mayor.", "pista");
  } else {
    mostrarMensaje("🔽 El número secreto es menor.", "pista");
  }

  numeroInput.value = "";
  numeroInput.focus();
}

// Eventos
btnAdivinar.addEventListener("click", procesarIntento);
btnReiniciar.addEventListener("click", iniciarJuego);
numeroInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && juegoActivo.activo) {
    procesarIntento();
  }
});

// Iniciar por primera vez
iniciarJuego();
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
