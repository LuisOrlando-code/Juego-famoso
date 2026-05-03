var bloque = document.getElementById("block");
var hueco = document.getElementById("hole");
var personaje = document.getElementById("character");
var saltando = 0;
var contador = 0;

hueco.addEventListener('animationiteration', () =>{
    var aleatorio = -((Math.random()*300) + 150);
    hueco.style.top = aleatorio + "px";
    contador++;
});

setInterval(function(){
    var topPersonaje = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));
    
    if(saltando == 0){
        personaje.style.top = (topPersonaje + 3) + "px";
    }

    var izquierdaBloque = parseInt(window.getComputedStyle(bloque).getPropertyValue("left"));
    var topHueco = parseInt(window.getComputedStyle(hueco).getPropertyValue("top"));
    var posicionRelativa = -(500 - topPersonaje);

    if((topPersonaje > 480) || ((izquierdaBloque < 50) && (izquierdaBloque > 0) && ((posicionRelativa < topHueco) || (posicionRelativa > topHueco + 130)))){
        alert("Game Over. Score: " + (contador - 1));
        personaje.style.top = "100px";
        contador = 0;
    }

}, 10);

function saltar(){
    saltando = 1;
    let contadorSalto = 0;

    var intervaloSalto = setInterval(function(){
        var topPersonaje = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));

        if((topPersonaje > 6) && (contadorSalto < 15)){
            personaje.style.top = (topPersonaje - 5) + "px";
        }

        if(contadorSalto > 20){
            clearInterval(intervaloSalto);
            saltando = 0;
            contadorSalto = 0;
        }

        contadorSalto++;
    }, 10);
}