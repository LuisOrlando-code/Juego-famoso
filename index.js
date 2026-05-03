var bloque = document.getElementById("bloque");
var hueco = document.getElementById("hueco");
var personaje = document.getElementById("personaje");
var marcador = document.getElementById("marcador");
var pantallaFin = document.getElementById("finJuego");

var saltando = 0;
var puntaje = 0;
var juegoActivo = true;

// Cambiar posición del hueco
hueco.addEventListener("animationiteration", () => {
    var posicionAleatoria = -((Math.random() * 300) + 100);
    hueco.style.top = posicionAleatoria + "px";

    if(juegoActivo){
        puntaje++;
        marcador.innerText = puntaje;
    }
});

// Bucle del juego
setInterval(function () {
    if(!juegoActivo) return;

    var topPersonaje = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));

    // gravedad
    if (saltando == 0) {
        personaje.style.top = (topPersonaje + 3) + "px";
    }

    var izquierdaBloque = parseInt(window.getComputedStyle(bloque).getPropertyValue("left"));
    var topHueco = parseInt(window.getComputedStyle(hueco).getPropertyValue("top"));
    var posicionRelativa = -(500 - topPersonaje);

    // colisiones
    if (
        topPersonaje > 480 ||
        (izquierdaBloque < 80 && izquierdaBloque > 30 &&
        (posicionRelativa < topHueco || posicionRelativa > topHueco + 130))
    ) {
        terminarJuego();
    }

}, 10);

// saltar
function saltar() {
    if(!juegoActivo) return;

    saltando = 1;
    let contador = 0;

    var intervalo = setInterval(function () {
        var topPersonaje = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));

        if (topPersonaje > 0 && contador < 15) {
            personaje.style.top = (topPersonaje - 5) + "px";
        }

        if (contador > 20) {
            clearInterval(intervalo);
            saltando = 0;
        }

        contador++;
    }, 10);
}

// game over
function terminarJuego(){
    juegoActivo = false;
    pantallaFin.style.display = "block";
}

// reiniciar
function reiniciar(){
    juegoActivo = true;
    puntaje = 0;
    marcador.innerText = 0;
    personaje.style.top = "100px";
    pantallaFin.style.display = "none";
}