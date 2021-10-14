const fila = document.querySelector("#fila1");
const canva = document.querySelector(".canva");

const hour = document.querySelector("#h");
const minute = document.querySelector("#m");
const second = document.querySelector("#s");

const backGameOver = document.querySelector(".backGameOver");
const gameOver = document.querySelector("#gameOver");
const timeOut = document.querySelector("#timeOut");
const textFails = document.querySelector("#textFails");
const btnPlay = document.querySelector("#btnPlay");

let time = 0;
let timeMinute = 0;
let timeHour = 0;
let timeCount = 0;
function chronometer(){
    if(second.textContent == 59){
        time = 0;
        timeMinute = timeMinute + 1;
        second.textContent = `0${time}`;
        
        if(timeMinute < 10){
          minute.textContent = `0${timeMinute}`;
        }else{
          minute.textContent = timeMinute;
        }

    }else if(minute.textContent == 59){
        time = 0;
        timeMinute = 0;
        timeHour = timeHour + 1;
        second.textContent = `0${time}`;
        minute.textContent = `0${timeMinute}`;
        hour.textContent = `0${timeHour}`;
        if(timeHour < 10){
        }else{
          hour.textContent = timeHour;
        }
        
    }else{
        time = time + 1;
        if(time < 10){
          second.textContent = `0${time}`;
        }else{
          second.textContent = time;
        }
    }
}

let varFinish = 0;
let startChrono;
let fails = 0;
function createEvent(e) {
    let listCheck = fila.childNodes;
    let objEvent = e.target;

    if(timeCount == 0){
        startChrono = setInterval(chronometer,1000);
        timeCount++;
    }

    let countList = 0;
    for(var i = 0; i < listCheck.length; i++){
        
        if(listCheck[i].value == 1 && objEvent.value == 0){
            objEvent.style.color = "rgb(218, 146, 146)"; 
            objEvent.value = 1;

            let valor1 = objEvent.textContent;
            let valor2 = listCheck[i].textContent;

            canva.style.visibility = "visible";

            //SI SON LAS MISMAS CARTAS
            if(valor1 == valor2){ 
                objEvent.style.color = "rgb(100, 155, 89)";
                listCheck[i].style.color = "rgb(100, 155, 89)";
                objEvent.style.borderColor = "rgb(100, 155, 89)";
                listCheck[i].style.borderColor = "rgb(100, 155, 89)";

                setTimeout(()=>{
                    canva.style.visibility = "hidden";
                },1000);

                objEvent.value = 2;
                listCheck[i].value = 2;

                varFinish = varFinish + 2; //Suma dos en referencia a las cartas correctas volteadas. Será comparada luego.

            //SI NO SON LAS MISMAS CARTAS  
            } else{ 
                objEvent.style.color = "red";
                listCheck[i].style.color = "red";
                objEvent.style.borderColor = "red";
                listCheck[i].style.borderColor = "red";

                setTimeout((i) => {
                    objEvent.style.color = "rgb(250, 203, 203)";
                    
                    listCheck[i].style.color = "rgb(250, 203, 203)";
                    objEvent.style.borderColor = "rgb(218, 146, 146)";
                    listCheck[i].style.borderColor = "rgb(218, 146, 146)";

                    objEvent.value = 0;
                    listCheck[i].value = 0;
                    canva.style.visibility = "hidden";
                },1000, i);

                fails++;
            }

        } else if(countList == (listCheck.length-1) && objEvent.value == 0){
            objEvent.style.color = "rgb(218, 146, 146)";
            objEvent.value = 1;

        } else {
            countList++;
        }
    }
    //CONDICIÓN PARA FINALIZAR
    if(varFinish == listCheck.length){
        clearInterval(startChrono);
        timeOut.textContent = `${hour.textContent}:${minute.textContent}:${second.textContent}`;
        textFails.textContent = `Fails: ${fails}`;
        let blinkTime = setInterval(()=>{
            if(timeOut.style.color == "red"){
                timeOut.style.color = "white";
            }else{
                timeOut.style.color = "red";
            }
        }, 400);

        setTimeout(()=>{
            backGameOver.style.visibility = "visible";
        },1000)
        
        btnPlay.addEventListener("click", function(){
            backGameOver.style.visibility = "hidden";
            varFinish = 0;
            timeCount = 0;

            fails = 0;
            time = 0;
            timeMinute = 0;
            timeHour = 0;
            hour.textContent = "00";
            minute.textContent = "00";
            second.textContent = "00";

            while(fila.firstChild){
                fila.removeChild(fila.firstChild);
            }
            createCards(); //iniciar de nuevo
        });
    }
}

//Función para crear las cartas de juego de manera aleatoria.
function createCards() {
     //Marcador para condicionar las columnas por filas.
    let varCards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    let long = varCards.length;

    for(var i = 0; i < long; i++){
        let randomNum = Math.floor((Math.random() * ((varCards.length-1) - 0 + 1)) + 0);
        let indexCard = varCards[randomNum];

        let elemento = document.createElement("div");
        elemento.setAttribute("class","col-2 targetas listCheck");
        elemento.value = 0;
        elemento.innerHTML = indexCard;
        elemento.addEventListener("click", createEvent);

        fila.appendChild(elemento);

        varCards.splice(randomNum,1);
    }
}
createCards();