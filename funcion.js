let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let clickAudio = new Audio('./sounds/click.wav');

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let mostrarMensaje = document.getElementById("mensaje")

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.querySelector('img').src = `./img/${numeros[i]}.png`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
        // Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.querySelector('img').src = `./img/${primerResultado}.png`;
        clickAudio.play();
        tarjeta1.disabled = true;

    } else if (tarjetasDestapadas == 2) {
        // Mostrar el segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.querySelector('img').src = `./img/${segundoResultado}.png`;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            // Reiniciar contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} ✨`;
                mostrarTiempo.innerHTML = `Fantástico: ${timerInicial - timer} segundos`;
                winAudio.play();
            }
        } else {
            // Mostrar momentáneamente y luego ocultar las tarjetas no coincidentes
            setTimeout(() => {
                tarjeta1.querySelector('img').src = './img/default.png';
                tarjeta2.querySelector('img').src = './img/default.png';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                wrongAudio.play();
            }, 700);
        }
    }
}
